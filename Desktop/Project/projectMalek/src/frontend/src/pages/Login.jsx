import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import { Bus, Mail, Lock, CheckCircle, Loader2, Sparkles } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', formData)
      const { user, token } = response.data.data
      login(user, token)

      // Show success animation
      setSuccess(true)

      // Navigate after animation
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion')
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
        <Bus className="absolute top-20 left-20 w-8 h-8 text-white/10 animate-float" />
        <Sparkles className="absolute top-40 right-32 w-6 h-6 text-white/10 animate-float delay-300" />
        <Bus className="absolute bottom-32 right-20 w-10 h-10 text-white/10 animate-float delay-700" />
      </div>

      {/* Login Card */}
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
              <h3 className="text-2xl font-bold text-white">Connexion réussie !</h3>
              <p className="text-white/90 mt-2">Redirection en cours...</p>
            </div>
          </div>
        )}

        {/* Logo & Title */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 animate-float">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">IBDTNS</h1>
          <p className="text-white/80 text-sm">Système de Détection et Suivi des Bus</p>
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/90">
                Mot de passe
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
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
                <span>Connexion en cours...</span>
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-white/80 animate-fade-in delay-200">
          Pas encore de compte?{' '}
          <Link to="/register" className="text-white font-semibold hover:underline transition-all">
            S'inscrire
          </Link>
        </p>

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
