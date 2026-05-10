import { useState, useEffect } from 'react'
import { CheckCircle2, MessageSquare, Shield, Zap, Building2, Loader2, AlertCircle } from 'lucide-react'
import { fetchSettings, saveSettings, sendTestMessage } from '../api'

function Connect() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [testPhone, setTestPhone] = useState('')
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [form, setForm] = useState({ metaPhoneNumberId: '', metaAccessToken: '', provider: 'meta' })

  useEffect(() => { loadSettings() }, [])

  async function loadSettings() {
    try {
      setLoading(true)
      const data = await fetchSettings()
      setSettings(data)
      setForm({
        metaPhoneNumberId: data.metaPhoneNumberId || '',
        metaAccessToken: data.metaAccessToken || '',
        provider: data.provider || 'meta',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      await saveSettings(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      await loadSettings()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleTest() {
    if (!testPhone) return
    setTestLoading(true)
    setTestResult(null)
    try {
      await sendTestMessage(testPhone)
      setTestResult({ success: true, message: 'Test message sent successfully!' })
    } catch (err) {
      setTestResult({ success: false, message: err.message })
    } finally {
      setTestLoading(false)
    }
  }

  const isConnected = settings?.provider === 'meta' && settings?.metaPhoneNumberId && settings?.metaAccessToken && settings?.metaAccessToken !== 'YOUR_PERMANENT_TOKEN_HERE'

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">WhatsApp Business Connection</h1>
        <p className="text-gray-500 mt-1">Manage your WhatsApp Business API integration</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}
        </div>
      )}

      <div className="card p-6 lg:p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{isConnected ? 'Connected' : 'Not Connected'}</h2>
              <span className={"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium " + (isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                <div className={"w-1.5 h-1.5 rounded-full " + (isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500')}></div>
                {isConnected ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {isConnected ? 'Your WhatsApp Business account is ready to send messages' : 'Configure your Meta credentials below to connect'}
            </p>
          </div>
        </div>

        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />Phone Number ID
              </div>
              <p className="text-sm font-semibold text-gray-900">{settings.metaPhoneNumberId}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                <Shield className="w-3.5 h-3.5" />Provider
              </div>
              <p className="text-sm font-semibold text-gray-900">Meta Cloud API</p>
            </div>
          </div>
        )}
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Phone Number ID</label>
            <input
              type="text"
              value={form.metaPhoneNumberId}
              onChange={e => setForm({ ...form, metaPhoneNumberId: e.target.value })}
              placeholder="e.g. 1058091134059733"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Access Token</label>
            <input
              type="password"
              value={form.metaAccessToken}
              onChange={e => setForm({ ...form, metaAccessToken: e.target.value })}
              placeholder="EAAxxxxxxxx..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">Get this from Meta Developer Console → WhatsApp → API Setup</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Configuration'}
          </button>
        </div>
      </div>

      {isConnected && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Send Test Message</h3>
          <div className="flex gap-3">
            <input
              type="tel"
              placeholder="+92 300 1234567"
              value={testPhone}
              onChange={e => setTestPhone(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button onClick={handleTest} disabled={!testPhone || testLoading} className="btn-primary">
              {testLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Test'}
            </button>
          </div>
          {testResult && (
            <div className={"text-sm px-4 py-3 rounded-lg mt-3 " + (testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
              {testResult.message}
            </div>
          )}
        </div>
      )}

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Active Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Zap, title: 'Real-time Notifications', desc: 'Instant order updates via WhatsApp' },
            { icon: MessageSquare, title: 'Automated Messages', desc: 'Order confirmation, shipping, delivery' },
            { icon: Shield, title: 'Secure API', desc: 'Meta verified WhatsApp Business API' },
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

export default Connect
