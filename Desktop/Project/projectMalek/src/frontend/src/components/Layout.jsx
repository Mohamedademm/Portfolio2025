import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import {
  LayoutDashboard,
  Bus,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  BarChart2,
  Activity
} from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/' },
    { icon: Activity, label: 'Temps Réel', path: '/monitor' },
    { icon: Bus, label: 'Gestion des Bus', path: '/buses' },
    { icon: BarChart2, label: 'Statistiques', path: '/stats' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950 flex">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 text-white transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Bus className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-sans">IBDTNS</span>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile (Bottom) */}
        <div className="absolute bottom-0 w-full p-4 border-t border-dark-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-700 flex items-center justify-center text-sm font-bold">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 flex items-center justify-between px-4 lg:px-8 transition-colors">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h2 className="text-xl font-semibold text-dark-900 dark:text-white hidden lg:block">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Tableau de bord'}
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-colors"
            >
              {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-dark-900"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-dark-950 p-4 lg:p-8 transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
