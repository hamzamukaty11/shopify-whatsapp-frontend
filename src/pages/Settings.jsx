import { useState, useEffect } from 'react'
import { ShoppingBag, Truck, Package, XCircle, CreditCard, RefreshCw, Bell, Loader2, CheckCircle2 } from 'lucide-react'
import { fetchSettings, toggleAutomation } from '../api'

function Settings() {
  const [automations, setAutomations] = useState({
    order_confirmed: true,
    payment_confirmed: false,
    order_shipped: true,
    order_cancelled: true,
    abandoned_cart: false,
  })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { loadSettings() }, [])

  async function loadSettings() {
    try {
      setLoading(true)
      const data = await fetchSettings()
      if (data.automations) setAutomations(data.automations)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(key) {
    const newVal = !automations[key]
    setAutomations({ ...automations, [key]: newVal })
    setSaved(false)
    try {
      await toggleAutomation(key, newVal)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setAutomations({ ...automations, [key]: !newVal })
      setError('Failed to update setting')
    }
  }

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={"relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors " + (enabled ? 'bg-green-500' : 'bg-gray-200')}
    >
      <span className={"inline-block h-4 w-4 transform rounded-full bg-white transition-transform " + (enabled ? 'translate-x-6' : 'translate-x-1')} />
    </button>
  )

  const events = [
    { key: 'order_confirmed', icon: ShoppingBag, title: 'Order Confirmation', desc: 'Send when a new order is placed', color: 'green' },
    { key: 'payment_confirmed', icon: CreditCard, title: 'Payment Confirmed', desc: 'Send when payment is received', color: 'indigo' },
    { key: 'order_shipped', icon: Truck, title: 'Order Shipped', desc: 'Send when order is dispatched', color: 'blue' },
    { key: 'order_cancelled', icon: XCircle, title: 'Order Cancelled', desc: 'Send when order is cancelled', color: 'red' },
    { key: 'abandoned_cart', icon: RefreshCw, title: 'Abandoned Cart', desc: 'Send when cart is abandoned', color: 'orange' },
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
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-500 mt-1">Configure which events trigger WhatsApp notifications</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Setting saved!
        </div>
      )}

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-1">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Event Triggers</h2>
          </div>
          <p className="text-sm text-gray-500">Toggles save automatically</p>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <div key={event.key} className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={"w-10 h-10 rounded-lg flex items-center justify-center shrink-0 " + colorClasses[event.color]}>
                    <event.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{event.desc}</p>
                  </div>
                </div>
                <Toggle
                  enabled={!!automations[event.key]}
                  onChange={() => handleToggle(event.key)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
