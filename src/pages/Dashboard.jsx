import { useState, useEffect } from 'react'
import { MessageCircle, CheckCircle2, AlertCircle, Send, X, Loader2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { fetchAnalytics, fetchLogs, sendTestMessage } from '../api'

function Dashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTestModal, setShowTestModal] = useState(false)
  const [testPhone, setTestPhone] = useState('')
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)
      const [analyticsData, logsData] = await Promise.all([
        fetchAnalytics(30),
        fetchLogs({ limit: 6 }),
      ])
      setAnalytics(analyticsData)
      setLogs(logsData.logs || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSendTest() {
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

  const stats = analytics ? [
    { name: 'Messages Sent', value: (analytics.total || 0).toLocaleString(), icon: Send, color: 'green' },
    { name: 'Delivery Rate', value: (analytics.deliveryRate || '0.0') + '%', icon: CheckCircle2, color: 'blue' },
    { name: 'Delivered', value: (analytics.delivered || 0).toLocaleString(), icon: MessageCircle, color: 'purple' },
    { name: 'Failed Messages', value: (analytics.failed || 0).toLocaleString(), icon: AlertCircle, color: 'red' },
  ] : []

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  const chartData = analytics?.daily?.slice(-7).map(d => ({
    day: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    sent: d.count || 0,
  })) || []

  const eventData = analytics?.byEvent
    ? Object.entries(analytics.byEvent).map(([name, val]) => ({
        name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count: (val.delivered || 0) + (val.failed || 0) + (val.pending || 0)
      })).sort((a, b) => b.count - a.count).slice(0, 5)
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, BookVogue</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your WhatsApp notifications today.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadData} className="btn-secondary">Refresh</button>
          <button onClick={() => { setShowTestModal(true); setTestResult(null); setTestPhone('') }} className="btn-primary">
            <Send className="w-4 h-4" />Send Test Message
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">Could not load data: {error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="stat-card animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-32"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="stat-card">
              <div className={"w-10 h-10 rounded-lg flex items-center justify-center " + colorClasses[stat.color]}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Message Activity</h2>
            <p className="text-sm text-gray-500">Last 7 days</p>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="sent" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">No message data yet. Send a test message to get started!</div>
          )}
        </div>

        <div className="card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Notifications</h2>
            <p className="text-sm text-gray-500">Most sent this month</p>
          </div>
          {eventData.length > 0 ? (
            <div className="space-y-4">
              {eventData.map((item) => {
                const max = Math.max(...eventData.map(d => d.count))
                const percentage = max > 0 ? (item.count / max) * 100 : 0
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1.5 text-sm">
                      <span className="font-medium text-gray-700">{item.name}</span>
                      <span className="text-gray-500">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: percentage + '%' }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No data yet</div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-500">Latest notifications sent to customers</p>
        </div>
        <div className="overflow-x-auto">
          {logs.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Phone</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Event</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">Time</th>
                  <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {(log.customerName || 'U').charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{log.customerName || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{log.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {(log.event || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'delivered' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700"><CheckCircle2 className="w-3.5 h-3.5" />Delivered</span>
                      ) : log.status === 'failed' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700"><AlertCircle className="w-3.5 h-3.5" />Failed</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center text-gray-400 text-sm">No messages sent yet. Send a test message to get started!</div>
          )}
        </div>
      </div>

      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Test Message</h3>
              <button onClick={() => setShowTestModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Enter a phone number with country code (e.g. +92 300 1234567).</p>
            <input
              type="tel"
              placeholder="+92 300 1234567"
              value={testPhone}
              onChange={e => setTestPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {testResult && (
              <div className={"text-sm px-4 py-3 rounded-lg mb-4 " + (testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                {testResult.message}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setShowTestModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleSendTest} disabled={!testPhone || testLoading} className="btn-primary flex-1">
                {testLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {testLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
