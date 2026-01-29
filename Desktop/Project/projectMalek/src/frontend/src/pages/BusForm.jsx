import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import { ChevronLeft, Save } from 'lucide-react'

export default function BusForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        numeroImmatriculation: '',
        numeroLigne: '',
        categorie: 'standard',
        type: 'public',
        couleur: '#000000',
        compagnie: 'Autre'
    })

    useEffect(() => {
        if (isEditMode) {
            fetchBus()
        }
    }, [id])

    const fetchBus = async () => {
        try {
            const response = await api.get(`/buses/${id}`)
            const bus = response.data.data
            setFormData({
                numeroImmatriculation: bus.numeroImmatriculation,
                numeroLigne: bus.numeroLigne || '',
                categorie: bus.categorie,
                type: bus.type,
                couleur: bus.couleur || '#000000',
                compagnie: bus.compagnie || 'Autre'
            })
        } catch (error) {
            console.error('Erreur chargement bus:', error)
            alert("Erreur lors du chargement des données du bus")
            navigate('/buses')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                await api.put(`/buses/${id}`, formData)
            } else {
                await api.post('/buses', formData)
            }
            navigate('/buses')
        } catch (error) {
            console.error('Erreur sauvegarde:', error)
            alert(error.response?.data?.message || 'Erreur lors de la sauvegarde')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/buses')}
                    className="p-2 hover:bg-white dark:hover:bg-dark-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-dark-700"
                >
                    <ChevronLeft className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-dark-900 dark:text-white">
                        {isEditMode ? 'Modifier le bus' : 'Ajouter un nouveau bus'}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEditMode ? 'Mettez à jour les informations du véhicule.' : 'Enregistrez un nouveau véhicule dans la flotte.'}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 shadow-sm rounded-xl border border-gray-200 dark:border-dark-700">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="col-span-2">
                            <h3 className="text-base font-semibold text-dark-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-2 mb-4">Informations Principales</h3>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Numéro d'immatriculation <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: TUN-1234"
                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white"
                                value={formData.numeroImmatriculation}
                                onChange={(e) => setFormData({ ...formData, numeroImmatriculation: e.target.value })}
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Numéro de ligne
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: L1, L2"
                                className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white"
                                value={formData.numeroLigne}
                                onChange={(e) => setFormData({ ...formData, numeroLigne: e.target.value })}
                            />
                        </div>

                        <div className="col-span-2 mt-2">
                            <h3 className="text-base font-semibold text-dark-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-2 mb-4">Caractéristiques Techniques</h3>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Catégorie
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white appearance-none"
                                    value={formData.categorie}
                                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                                >
                                    <option value="mini">Mini Bus</option>
                                    <option value="standard">Standard</option>
                                    <option value="long">Long (Articulé)</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type de service
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white appearance-none"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="public">Transport Public</option>
                                    <option value="scolaire">Transport Scolaire</option>
                                    <option value="prive">Privé / Touristique</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Compagnie
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none bg-white dark:bg-dark-900 text-dark-900 dark:text-white appearance-none"
                                    value={formData.compagnie}
                                    onChange={(e) => setFormData({ ...formData, compagnie: e.target.value })}
                                >
                                    <option value="TTS">TTS</option>
                                    <option value="Voyagiste">Voyagiste</option>
                                    <option value="Mhalla">Mhalla</option>
                                    <option value="SNTRI">SNTRI</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Couleur d'identification
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    className="h-10 w-20 rounded cursor-pointer border border-gray-200 dark:border-dark-600 p-1 bg-white dark:bg-dark-800"
                                    value={formData.couleur}
                                    onChange={(e) => setFormData({ ...formData, couleur: e.target.value })}
                                />
                                <span className="text-sm text-gray-500 dark:text-gray-400">{formData.couleur}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-dark-700 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/buses')}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            <Save className="h-4 w-4" />
                            {loading ? 'Enregistrement...' : 'Enregistrer le bus'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
