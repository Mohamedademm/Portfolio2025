import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react'

export default function BusList() {
  const navigate = useNavigate()
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtres
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    categorie: '',
    type: ''
  })

  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBuses(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [search, filters])

  const handlePageChange = (newPage) => {
    fetchBuses(newPage)
  }

  const fetchBuses = async (page = pagination.page) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: pagination.limit,
        search,
        ...(filters.categorie && { categorie: filters.categorie }),
        ...(filters.type && { type: filters.type })
      }

      const response = await api.get('/buses', { params })
      setBuses(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bus?')) {
      try {
        await api.delete(`/buses/${id}`)
        fetchBuses()
      } catch (error) {
        alert('Erreur lors de la suppression')
      }
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'public': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-700/10 dark:ring-blue-500/30'
      case 'scolaire': return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 ring-yellow-600/20 dark:ring-yellow-500/30'
      case 'prive': return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-purple-700/10 dark:ring-purple-500/30'
      default: return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ring-gray-500/10 dark:ring-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 dark:text-white">Gestion des Bus</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Gérez votre flotte de véhicules et leurs affectations.</p>
        </div>
        <button
          onClick={() => navigate('/buses/new')}
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="h-5 w-5" />
          Ajouter un bus
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher (Immatriculation, Ligne)..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none appearance-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white"
              value={filters.categorie}
              onChange={(e) => setFilters(prev => ({ ...prev, categorie: e.target.value }))}
            >
              <option value="">Catégories</option>
              <option value="standard">Standard</option>
              <option value="mini">Mini</option>
              <option value="long">Long</option>
            </select>
          </div>

          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none appearance-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">Types</option>
              <option value="public">Public</option>
              <option value="scolaire">Scolaire</option>
              <option value="prive">Privé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
            <thead className="bg-gray-50/50 dark:bg-dark-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Immatriculation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Passages
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mb-2"></div>
                      Chargement des données...
                    </div>
                  </td>
                </tr>
              ) : buses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Aucun bus ne correspond à vos critères
                  </td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr key={bus._id} className="hover:bg-gray-50/80 dark:hover:bg-dark-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-xs">
                          {bus.numeroImmatriculation.substring(0, 2)}
                        </div>
                        <span className="font-medium text-dark-900 dark:text-white">{bus.numeroImmatriculation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Ligne <span className="font-semibold text-dark-700 dark:text-gray-300">{bus.numeroLigne || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getTypeColor(bus.type)}`}>
                        {bus.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">{bus.categorie}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-dark-900 dark:text-white">{bus.nombrePassages || 0}</span> passages
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/buses/edit/${bus._id}`)}
                          className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(bus._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && buses.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Affichage de <span className="font-medium text-dark-900 dark:text-white">{(pagination.page - 1) * pagination.limit + 1}</span> à{' '}
                  <span className="font-medium text-dark-900 dark:text-white">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  sur <span className="font-medium text-dark-900 dark:text-white">{pagination.total}</span> résultats
                </p>
              </div>

              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      aria-current={pagination.page === i + 1 ? 'page' : undefined}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-colors ${pagination.page === i + 1
                        ? 'bg-brand-600 text-white z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
                        : 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 focus:z-20 focus:outline-offset-0'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
