import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { Bus, Lock, CheckCircle, Loader2, Sparkles, AlertCircle } from 'lucide-react'

export default function ResetPassword() {
    const navigate = useNavigate()
    const { token } = useParams()
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        setLoading(true)

        try {
            await api.post(`/auth/reset-password/${token}`, {
                password: formData.password
            })

            setSuccess(true)

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la réinitialisation')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 flex items-center justify-center p-4">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-brand-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-brand-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <Bus className="absolute top-20 right-20 w-8 h-8 text-white/10 animate-float" />
                <Sparkles className="absolute top-40 left-32 w-6 h-6 text-white/10 animate-float delay-300" />
                <Bus className="absolute bottom-32 left-20 w-10 h-10 text-white/10 animate-float delay-700" />
            </div>

            {/* Card */}
            <div className={`
        relative max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 
        transform transition-all duration-700 ease-out
        ${success ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      `}>
                {/* Success Overlay */}
                {success && (
                    <div className="absolute inset-0 bg-green-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50 animate-fade-in">
                        <div className="text-center animate-scale-in">
                            <CheckCircle className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" />
                            <h3 className="text-2xl font-bold text-white">Mot de passe réinitialisé !</h3>
                            <p className="text-white/90 mt-2">Redirection vers la connexion...</p>
                        </div>
                    </div>
                )}

                {/* Logo & Title */}
                <div className="text-center mb-8 animate-slide-down">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 animate-float">
                        <Bus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Nouveau mot de passe</h1>
                    <p className="text-white/80 text-sm">Choisissez un mot de passe sécurisé</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
                    {/* Password Field */}
                    <div className="group">
                        <label className="block text-sm font-medium text-white/90 mb-2">
                            Nouveau mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <p className="text-xs text-white/60 mt-1.5 ml-1">
                            8+ caractères, majuscule, minuscule, chiffre et caractère spécial
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="group">
                        <label className="block text-sm font-medium text-white/90 mb-2">
                            Confirmer le mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white px-4 py-3 rounded-xl text-sm flex items-start gap-2 animate-shake">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-brand-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Réinitialisation...</span>
                            </>
                        ) : (
                            'Réinitialiser le mot de passe'
                        )}
                    </button>
                </form>

                {/* Back to Login */}
                <p className="mt-6 text-center text-sm text-white/80 animate-fade-in delay-200">
                    <Link to="/login" className="text-white font-semibold hover:underline transition-all">
                        Retour à la connexion
                    </Link>
                </p>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-gradient-to-br from-brand-400/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -top-2 -right-2 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs animate-fade-in delay-500">
                © 2026 IBDTNS - Tous droits réservés
            </div>
        </div>
    )
}
