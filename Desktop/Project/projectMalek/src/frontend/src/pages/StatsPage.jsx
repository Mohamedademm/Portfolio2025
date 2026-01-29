import { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts'
import { Activity, Bus, Clock, AlertTriangle } from 'lucide-react'
import api from '../services/api'

const COLORS = ['#4F46E5', '#10B981', '#F59E0B']

export default function StatsPage() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        activeBuses: 0,
        totalPassages: 0,
        avgWaitTime: '0 min',
        criticalAlerts: 0
    })
    const [hourlyData, setHourlyData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [punctualityData, setPunctualityData] = useState([])

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            setLoading(true)
            const [dailyRes, hourlyRes, distributionRes, punctualityRes] = await Promise.all([
                api.get('/stats/daily'),
                api.get('/stats/hourly'),
                api.get('/stats/distribution'),
                api.get('/stats/punctuality')
            ])

            if (dailyRes.data.success) {
                setStats(dailyRes.data.data)
            }

            if (hourlyRes.data.success) {
                setHourlyData(hourlyRes.data.data)
            }

            if (distributionRes.data.success) {
                setCategoryData(distributionRes.data.data)
            }

            if (punctualityRes.data.success) {
                setPunctualityData(punctualityRes.data.data)
            }

        } catch (error) {
            console.error("Erreur lors du chargement des statistiques:", error)
        } finally {
            setLoading(false)
        }
    }

    // Theme support for charts
    const isDark = document.documentElement.classList.contains('dark')
    const textColor = isDark ? '#9CA3AF' : '#4B5563'
    const gridColor = isDark ? '#374151' : '#E5E7EB'

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Statistiques</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Analyse détaillée du trafic et de la flotte.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { name: 'Bus Actifs', value: stats.activeBuses, icon: Bus, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { name: 'Passages Aujourd\'hui', value: stats.totalPassages, icon: Activity, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { name: 'Temps d\'attente moy.', value: stats.avgWaitTime, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                    { name: 'Alertes Critiques', value: stats.criticalAlerts, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
                ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 p-5 scrollbar-hide">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                            <div className="ml-5">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</p>
                                <p className="text-2xl font-bold text-dark-900 dark:text-white">{item.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Traffic by Hour */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700">
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-6">Trafic Horaire</h3>
                    {hourlyData.length > 0 ? (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                    <XAxis
                                        dataKey="hour"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: textColor, fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: textColor, fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                                            borderColor: isDark ? '#374151' : '#E5E7EB',
                                            color: isDark ? '#FFFFFF' : '#000000'
                                        }}
                                        cursor={{ fill: isDark ? '#374151' : '#F3F4F6', opacity: 0.4 }}
                                    />
                                    <Bar
                                        dataKey="passages"
                                        fill="#4F46E5"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-gray-400">
                            Pas de données de trafic
                        </div>
                    )}
                </div>

                {/* Fleet Distribution */}
                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700">
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-6">Répartition de la Flotte</h3>
                    {categoryData.length > 0 ? (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                                            borderColor: isDark ? '#374151' : '#E5E7EB',
                                            color: isDark ? '#FFFFFF' : '#000000'
                                        }}
                                    />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-gray-400">
                            Pas de données de flotte
                        </div>
                    )}
                </div>

                {/* Punctuality Trends */}
                <div className="col-span-1 lg:col-span-2 bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700">
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-6">Ponctualité Hebdomadaire (%)</h3>
                    {punctualityData.length > 0 ? (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={punctualityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: textColor, fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: textColor, fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                                            borderColor: isDark ? '#374151' : '#E5E7EB',
                                            color: isDark ? '#FFFFFF' : '#000000'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="onTime"
                                        name="À l'heure"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="late"
                                        name="En Retard"
                                        stroke="#EF4444"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-gray-400">
                            Pas de données de ponctualité
                        </div>
                    )}
                </div>

            </div>
        </div>

    )
}
