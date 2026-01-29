import { useState, useEffect } from 'react'
import api from '../services/api'
import io from 'socket.io-client'
import { Bus, MapPin, Users, Activity, Clock, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentDetections, setRecentDetections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    // Connexion WebSocket
    const socket = io('http://localhost:5000') // Ensure this points to correct backend port
    socket.on('detection:new', (data) => {
      setRecentDetections((prev) => [data.detection, ...prev.slice(0, 9)])
    })
    return () => socket.disconnect()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, detectionsRes] = await Promise.all([
        api.get('/buses/stats/summary'),
        api.get('/detections/recent?limit=10'),
      ])
      setStats(statsRes.data.data)
      setRecentDetections(detectionsRes.data.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  const statCards = [
    { name: 'Total Bus', value: stats?.total || 0, icon: Bus, color: 'text-brand-600', bg: 'bg-brand-50' },
    { name: 'En Service (Public)', value: stats?.actifs || 0, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Bus Scolaires', value: stats?.enRoute || 0, icon: MapPin, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Hors Service', value: stats?.inactifs || 0, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Vue d'ensemble</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Statistiques en temps réel de la flotte.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-dark-800 overflow-hidden shadow-sm rounded-xl border border-gray-100 dark:border-dark-700 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-bold text-dark-900 dark:text-white">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Détections récentes */}
      <div className="bg-white dark:bg-dark-800 shadow-sm rounded-xl border border-gray-100 dark:border-dark-700">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white">Activité Récente</h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
            Temps Réel
          </span>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-dark-700">
          {recentDetections.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <Clock className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
              <p>Aucune détection récente</p>
            </div>
          ) : (
            recentDetections.map((detection, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                        {detection.numeroBus?.substring(0, 2) || 'B'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark-900 dark:text-white">
                        Bus {detection.numeroBus}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <span className="capitalize">{detection.type || 'Standard'}</span>
                        <span>•</span>
                        <span>{detection.categorie}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark-900 dark:text-white">
                      {new Date(detection.derniereMiseAJour).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      Il y a {Math.floor((new Date() - new Date(detection.derniereMiseAJour)) / 60000)} min
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
