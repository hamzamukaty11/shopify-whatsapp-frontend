import { useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Settings as SettingsIcon, 
  User,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Mail
} from 'lucide-react'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'WhatsApp Connection', href: '/connect', icon: MessageSquare },
    { name: 'Message Templates', href: '/templates', icon: FileText },
    { name: 'Notification Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Account', href: '/profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <div className="w-10 h-10 bg-whatsapp rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">Auto Order</h1>
              <p className="text-xs text-gray-500">Confirmation</p>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden ml-auto text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom card - upgrade prompt */}
          <div className="p-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">Pro Plan</h3>
              </div>
              <p className="text-xs text-green-50 mb-3">Unlock unlimited messages and advanced features</p>
              <button className="w-full bg-white text-green-700 text-xs font-semibold py-2 rounded-lg hover:bg-green-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-1 text-xs text-gray-500">
              <Link to="/contact" className="hover:text-gray-700 flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                Contact Support
              </Link>
              <a href="https://hamzamukaty11.github.io/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="https://hamzamukaty11.github.io/privacy-policy/cookie-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 min-w-[280px]">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent text-sm outline-none flex-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="h-6 w-px bg-gray-200"></div>
              
              <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1.5 pr-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  BV
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">BookVogue</p>
                  <p className="text-xs text-gray-500">bookvogue.myshopify.com</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
