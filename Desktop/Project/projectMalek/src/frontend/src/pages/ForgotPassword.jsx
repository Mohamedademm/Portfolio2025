import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Bus, Mail, ArrowLeft, CheckCircle, Loader2, Sparkles, Copy, Check } from 'lucide-react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [resetData, setResetData] = useState(null)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await api.post('/auth/forgot-password', { email })
            setResetData(response.data.data)
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la demande')
            setLoading(false)
        }
    }

    const copyToken = () => {
        navigator.clipboard.writeText(resetData.resetToken)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(resetData.resetUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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
                <Bus className="absolute top-20 left-20 w-8 h-8 text-white/10 animate-float" />
                <Sparkles className="absolute top-40 right-32 w-6 h-6 text-white/10 animate-float delay-300" />
                <Bus className="absolute bottom-32 right-20 w-10 h-10 text-white/10 animate-float delay-700" />
            </div>

            {/* Card */}
            <div className="relative max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                {!success ? (
                    <>
                        {/* Logo & Title */}
                        <div className="text-center mb-8 animate-slide-down">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 animate-float">
                                <Bus className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Mot de passe oublié ?</h1>
                            <p className="text-white/80 text-sm">Entrez votre email pour réinitialiser</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
                            {/* Email Field */}
                            <div className="group">
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all outline-none"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white px-4 py-3 rounded-xl text-sm animate-shake">
                                    {error}
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
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    'Envoyer le lien'
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <Link
                            to="/login"
                            className="mt-6 flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-all animate-fade-in delay-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la connexion
                        </Link>
                    </>
                ) : (
                    /* Success State */
                    <div className="text-center animate-scale-in">
                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-white mb-2">Email envoyé !</h3>
                        <p className="text-white/80 text-sm mb-6">
                            Un lien de réinitialisation a été envoyé à <strong>{email}</strong>
                        </p>

                        {/* Development: Show Token */}
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-4">
                            <p className="text-white/60 text-xs mb-2">Mode développement - Token:</p>
                            <div className="flex items-center gap-2 bg-dark-900/50 rounded-lg p-3">
                                <code className="flex-1 text-white text-xs break-all font-mono">
                                    {resetData?.resetToken}
                                </code>
                                <button
                                    onClick={copyToken}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-white/60" />
                                    )}
                                </button>
                            </div>

                            <Link
                                to={`/reset-password/${resetData?.resetToken}`}
                                className="mt-3 inline-block w-full bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                Aller à la réinitialisation
                            </Link>
                        </div>

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la connexion
                        </Link>
                    </div>
                )}

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-brand-400/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -top-2 -left-2 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-xs animate-fade-in delay-500">
                © 2026 IBDTNS - Tous droits réservés
            </div>
        </div>
    )
}
