import { useState, useEffect } from 'react'
import { Clock, ShoppingBag, Truck, Package, XCircle, RefreshCw, ExternalLink, Edit, X, Loader2, CheckCircle2 } from 'lucide-react'
import { fetchSettings, saveTemplate } from '../api'

function Templates() {
  const [templates, setTemplates] = useState({})
  const [loading, setLoading] = useState(true)
  const [editingKey, setEditingKey] = useState(null)
  const [editBody, setEditBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { loadTemplates() }, [])

  async function loadTemplates() {
    try {
      setLoading(true)
      const data = await fetchSettings()
      setTemplates(data.templates || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function startEdit(key, body) {
    setEditingKey(key)
    setEditBody(body)
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await saveTemplate(editingKey, editBody)
      setTemplates({ ...templates, [editingKey]: editBody })
      setSaved(true)
      setTimeout(() => { setEditingKey(null); setSaved(false) }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const templateDefs = [
    { key: 'order_confirmed', name: 'Order Confirmation', metaName: 'order_confirmed', icon: ShoppingBag, color: 'green' },
    { key: 'payment_confirmed', name: 'Payment Confirmed', metaName: 'payment_confirmed', icon: CheckCircle2, color: 'blue' },
    { key: 'order_shipped', name: 'Order Shipped', metaName: 'order_shipped', icon: Truck, color: 'blue' },
    { key: 'order_delivered', name: 'Order Delivered', metaName: 'order_delivered', icon: Package, color: 'purple' },
    { key: 'order_cancelled', name: 'Order Cancelled', metaName: 'order_cancelled', icon: XCircle, color: 'red' },
    { key: 'abandoned_cart', name: 'Abandoned Cart', metaName: 'abandoned_cart', icon: RefreshCw, color: 'orange' },
  ]

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-500 mt-1">Edit your WhatsApp notification message templates</p>
        </div>
        <a href="https://business.facebook.com/wa/manage/message-templates" target="_blank" rel="noopener noreferrer" className="btn-primary">
          <ExternalLink className="w-4 h-4" />
          Meta Templates
        </a>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
        Use variables like first_name, order_number, total, currency, items, address, tracking_number, carrier, checkout_url wrapped in double curly braces in your messages.
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templateDefs.map((def) => (
            <div key={def.key} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={"w-9 h-9 rounded-lg flex items-center justify-center " + colorClasses[def.color]}>
                    <def.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{def.name}</h3>
                    <p className="text-xs text-gray-500">{def.metaName}</p>
                  </div>
                </div>
                <button
                  onClick={() => startEdit(def.key, templates[def.key] || '')}
                  className="text-xs flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <Edit className="w-3 h-3" />Edit
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {templates[def.key] || 'No template set'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit: {templateDefs.find(d => d.key === editingKey)?.name}
              </h3>
              <button onClick={() => setEditingKey(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Variables: first_name, order_number, total, currency, items, address, tracking_number, carrier, checkout_url — wrap in double curly braces
            </p>
            <textarea
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
            />
            {saved && (
              <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />Template saved!
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setEditingKey(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? 'Saving...' : 'Save Template'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Templates
