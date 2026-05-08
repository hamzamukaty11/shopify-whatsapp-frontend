import { useState } from 'react'
import { 
  ShoppingBag, 
  Truck, 
  Package, 
  XCircle,
  CreditCard,
  RefreshCw,
  Bell,
  Globe,
  Clock,
  MessageSquare
} from 'lucide-react'

function Settings() {
  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    orderCancelled: true,
    refundIssued: true,
    paymentReceived: false,
  })

  const [businessHours, setBusinessHours] = useState(true)
  const [autoReply, setAutoReply] = useState(false)

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        enabled ? 'bg-whatsapp' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  const events = [
    { 
      key: 'orderConfirmation', 
      icon: ShoppingBag, 
      title: 'Order Confirmation', 
      desc: 'Send a confirmation message when a new order is placed',
      color: 'green'
    },
    { 
      key: 'orderShipped', 
      icon: Truck, 
      title: 'Order Shipped', 
      desc: 'Notify customer when their order is dispatched',
      color: 'blue'
    },
    { 
      key: 'orderDelivered', 
      icon: Package, 
      title: 'Order Delivered', 
      desc: 'Confirm delivery and request feedback',
      color: 'purple'
    },
    { 
      key: 'orderCancelled', 
      icon: XCircle, 
      title: 'Order Cancelled', 
      desc: 'Inform customer when an order is cancelled',
      color: 'red'
    },
    { 
      key: 'refundIssued', 
      icon: RefreshCw, 
      title: 'Refund Issued', 
      desc: 'Notify customer when a refund has been processed',
      color: 'orange'
    },
    { 
      key: 'paymentReceived', 
      icon: CreditCard, 
      title: 'Payment Received', 
      desc: 'Confirm payment for COD or installment orders',
      color: 'indigo'
    },
  ]

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-500 mt-1">Configure when and how messages are sent</p>
      </div>

      {/* Event Triggers */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Event Triggers</h2>
          </div>
          <p className="text-sm text-gray-500">Choose which Shopify events trigger WhatsApp notifications</p>
        </div>
        <div className="divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.key} className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[event.color]}`}>
                  <event.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{event.desc}</p>
                </div>
              </div>
              <Toggle 
                enabled={notifications[event.key]} 
                onChange={() => setNotifications({ ...notifications, [event.key]: !notifications[event.key] })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Delivery Settings</h2>
          </div>
          <p className="text-sm text-gray-500">Control when messages are delivered to customers</p>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Respect Business Hours</h3>
              <p className="text-sm text-gray-500 mt-0.5">Only send messages between 9:00 AM - 9:00 PM</p>
            </div>
            <Toggle enabled={businessHours} onChange={() => setBusinessHours(!businessHours)} />
          </div>
          <div className="p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Auto-Reply to Customer Messages</h3>
              <p className="text-sm text-gray-500 mt-0.5">Send automatic responses when customers reply</p>
            </div>
            <Toggle enabled={autoReply} onChange={() => setAutoReply(!autoReply)} />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-1">Timezone</h3>
            <p className="text-sm text-gray-500 mb-3">Your store's timezone for scheduling</p>
            <select className="w-full max-w-md bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>(GMT-08:00) Pacific Time</option>
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT+00:00) UTC</option>
              <option>(GMT+05:00) Pakistan Standard Time</option>
              <option>(GMT+05:30) India Standard Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <Globe className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Language Preferences</h2>
          </div>
          <p className="text-sm text-gray-500">Default language for outgoing messages</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { code: 'en', name: 'English', flag: '🇬🇧', selected: true },
              { code: 'es', name: 'Spanish', flag: '🇪🇸', selected: false },
              { code: 'fr', name: 'French', flag: '🇫🇷', selected: false },
              { code: 'ur', name: 'Urdu', flag: '🇵🇰', selected: false },
              { code: 'ar', name: 'Arabic', flag: '🇸🇦', selected: false },
              { code: 'hi', name: 'Hindi', flag: '🇮🇳', selected: false },
              { code: 'pt', name: 'Portuguese', flag: '🇵🇹', selected: false },
              { code: 'de', name: 'German', flag: '🇩🇪', selected: false },
            ].map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors ${
                  lang.selected 
                    ? 'bg-primary-50 border-primary-500 text-primary-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 sticky bottom-4 bg-gray-50 py-4">
        <button className="btn-secondary">Discard Changes</button>
        <button className="btn-primary">Save Settings</button>
      </div>
    </div>
  )
}

export default Settings
