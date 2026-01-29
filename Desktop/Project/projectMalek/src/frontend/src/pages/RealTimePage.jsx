import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
    Activity,
    Clock,
    MapPin,
    Truck,
    AlertTriangle,
    Download,
    Filter,
    Camera
} from 'lucide-react'
import api from '../services/api'

// Connect to Socket.IO (adjust URL if needed, usually same as API)
// Assuming proxy is set up or FRONTEND_URL matches
const socket = io('http://localhost:3000', {
    path: '/socket.io',
    transports: ['websocket']
})

export default function RealTimePage() {
    const [detections, setDetections] = useState([])
    const [stats, setStats] = useState({
        TTS: 0,
        Voyagiste: 0,
        Mhalla: 0,
        SNTRI: 0,
        Autre: 0
    })
    const [lastAlert, setLastAlert] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchInitialData()

        // Socket listeners
        socket.on('connect', () => {
            console.log('Connected to WebSocket')
        })

        socket.on('detection:new', (data) => {
            handleNewDetection(data)
        })

        return () => {
            socket.off('connect')
            socket.off('detection:new')
        }
    }, [])

    const fetchInitialData = async () => {
        try {
            setLoading(true)
            const [recentRes, statsRes] = await Promise.all([
                api.get('/detections/recent?limit=20'),
                api.get('/detections/stats')
            ])

            if (recentRes.data.success) {
                setDetections(recentRes.data.data)
            }

            if (statsRes.data.success && statsRes.data.data.parCompagnie) {
                setStats(prev => ({ ...prev, ...statsRes.data.data.parCompagnie }))
            }

        } catch (error) {
            console.error("Erreur chargement temps réel:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleNewDetection = (payload) => {
        const newDetection = payload.detection || payload
        const bus = payload.bus

        // Add to list
        setDetections(prev => [newDetection, ...prev].slice(0, 50))

        // Update stats
        if (newDetection.compagnie) {
            setStats(prev => ({
                ...prev,
                [newDetection.compagnie]: (prev[newDetection.compagnie] || 0) + 1
            }))
        }

        // Show alert
        setLastAlert({
            message: `Bus ${newDetection.numeroBus} (${newDetection.compagnie}) arrivé à ${newDetection.destination}`,
            time: new Date(),
            type: 'success'
        })

        // Clear alert after 5s
        setTimeout(() => setLastAlert(null), 5000)
    }

    const exportCSV = () => {
        const headers = ["Heure", "Matricule", "Compagnie", "Destination", "Catégorie", "Confiance"]
        const rows = detections.map(d => [
            new Date(d.timestamp || d.derniereMiseAJour).toLocaleString(),
            d.numeroBus,
            d.compagnie || 'N/A',
            d.destination || 'Inconnue',
            d.categorie,
            `${Math.round((d.confianceDetection || 0) * 100)}%`
        ])

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `detections_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Theme helpers
    const getCompanyColor = (company) => {
        switch (company) {
            case 'TTS': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
            case 'Voyagiste': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
            case 'Mhalla': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
            case 'SNTRI': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center gap-2">
                        <Activity className="h-6 w-6 text-brand-500" />
                        Monitoring Temps Réel
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Surveillance en direct des arrivées et départs.
                    </p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-700 transition"
                >
                    <Download className="h-4 w-4" />
                    Exporter CSV
                </button>
            </div>

            {/* Alert Banner */}
            {lastAlert && (
                <div className="animate-fade-in mx-auto w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
                        <Truck className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-300">Nouvelle Arrivée</h4>
                        <p className="text-sm text-green-700 dark:text-green-400">{lastAlert.message}</p>
                    </div>
                    <span className="ml-auto text-xs text-green-600 dark:text-green-500 font-mono">
                        {lastAlert.time.toLocaleTimeString()}
                    </span>
                </div>
            )}

            {/* Company Counters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.entries(stats).map(([company, count]) => (
                    <div key={company} className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-100 dark:border-dark-700 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getCompanyColor(company)}`}>
                                {company}
                            </span>
                            <Truck className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="mt-2">
                            <span className="text-2xl font-bold text-dark-900 dark:text-white">{count}</span>
                            <p className="text-xs text-gray-500">Bus aujourd'hui</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Table */}
            <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-dark-700 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-dark-700 flex justify-between items-center">
                    <h3 className="font-semibold text-dark-900 dark:text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        Dernières Arrivées
                    </h3>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            LIVE
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-dark-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                            <tr>
                                <th className="px-6 py-3">Heure</th>
                                <th className="px-6 py-3">Matricule</th>
                                <th className="px-6 py-3">Compagnie</th>
                                <th className="px-6 py-3">Destination</th>
                                <th className="px-6 py-3">Caméra</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex justify-center mb-2">
                                            <div className="animate-spin h-6 w-6 border-b-2 border-brand-500 rounded-full"></div>
                                        </div>
                                        Chargement des données...
                                    </td>
                                </tr>
                            ) : detections.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        En attente de détections...
                                    </td>
                                </tr>
                            ) : (
                                detections.map((d, i) => (
                                    <tr key={d._id || i} className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition duration-150">
                                        <td className="px-6 py-4 text-sm text-dark-900 dark:text-white font-mono">
                                            {(d.timestamp ? new Date(d.timestamp) : new Date(d.createdAt || d.derniereMiseAJour)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-dark-900 dark:text-white px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded border border-gray-200 dark:border-dark-600">
                                                {d.numeroBus || d.plate}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCompanyColor(d.compagnie)}`}>
                                                {d.compagnie || 'Autre'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-3 w-3 text-gray-400" />
                                                {d.destination || 'Non définie'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Camera className="h-3 w-3" />
                                                {d.metadata?.cameraId || 'Caméra 01'}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
