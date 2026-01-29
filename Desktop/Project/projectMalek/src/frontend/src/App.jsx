import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import BusList from './pages/BusList'
import BusForm from './pages/BusForm'
import Settings from './pages/Settings'
import StatsPage from './pages/StatsPage'
import RealTimePage from './pages/RealTimePage'
import Layout from './components/Layout'

function App() {
  const { isAuthenticated } = useAuthStore()
  const { darkMode } = useThemeStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="buses" element={<BusList />} />
        <Route path="buses/new" element={<BusForm />} />
        <Route path="buses/edit/:id" element={<BusForm />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="monitor" element={<RealTimePage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
