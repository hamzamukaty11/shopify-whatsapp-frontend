import { useState } from 'react'
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Shield, 
  Zap,
  ArrowRight,
  Building2,
  ChevronRight
} from 'lucide-react'

function Connect() {
  const [isConnected] = useState(true) // Show connected state for screenshots

  if (isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">WhatsApp Business Connection</h1>
          <p className="text-gray-500 mt-1">Manage your WhatsApp Business account integration</p>
        </div>

        {/* Connection Status Card */}
        <div className="card p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-whatsapp rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">Connected</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500">Your WhatsApp Business account is verified and ready to send messages</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary">Test Connection</button>
              <button className="btn-secondary text-red-600 border-red-200 hover:bg-red-50">Disconnect</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />
                Business Name
              </div>
              <p className="text-sm font-semibold text-gray-900">BookVogue</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <Phone className="w-3.5 h-3.5" />
                Phone Number
              </div>
              <p className="text-sm font-semibold text-gray-900">+1 555 0123 4567</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <Shield className="w-3.5 h-3.5" />
                Verification Tier
              </div>
              <p className="text-sm font-semibold text-gray-900">Tier 2 — 10K Messages/Day</p>
            </div>
          </div>
        </div>

        {/* Quality Rating */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Message Quality</h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">High</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">98%</p>
            <p className="text-xs text-gray-500">Based on customer feedback</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Phone Number Status</h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Connected</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">Verified</p>
            <p className="text-xs text-gray-500">Display name approved</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Daily Limit</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Tier 2</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">10,000</p>
            <p className="text-xs text-gray-500">Messages per day</p>
          </div>
        </div>

        {/* Features */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Active Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Real-time Notifications', desc: 'Instant order updates via WhatsApp' },
              { icon: MessageSquare, title: 'Two-way Messaging', desc: 'Customers can reply to messages' },
              { icon: Shield, title: 'End-to-End Encryption', desc: 'Secure WhatsApp Business API' },
              { icon: CheckCircle2, title: 'Delivery Reports', desc: 'Track message delivery status' },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-green-600 shrink-0">
                  <feature.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Initial connect state
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Connect WhatsApp Business</h1>
        <p className="text-gray-500 mt-1">Get started in 3 simple steps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { step: 1, title: 'Create Account', desc: 'Sign up for WhatsApp Business API' },
          { step: 2, title: 'Verify Business', desc: 'Complete Meta Business verification' },
          { step: 3, title: 'Start Sending', desc: 'Connect and start sending notifications' },
        ].map((item) => (
          <div key={item.step} className="card p-6">
            <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center font-bold mb-4">
              {item.step}
            </div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-whatsapp" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to connect?</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Click below to securely connect your WhatsApp Business account through Meta's official Embedded Signup flow.
        </p>
        <button className="btn-primary">
          Connect with WhatsApp
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Connect
