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
    { name: 'Messages Sent', value: (analytics.totalSent || 0).toLocaleString(), icon: Send, color: 'green' },
    { name: 'Delivery Rate', value: analytics.totalSent > 0 ? ((analytics.totalDelivered / analytics.totalSent) * 100).toFixed(1) + '%' : '0%', icon: CheckCircle2, color: 'blue' },
    { name: 'Delivered', value: (analytics.totalDelivered || 0).toLocaleString(), icon: MessageCircle, color: 'purple' },
    { name: 'Failed Messages', value: (analytics.totalFailed || 0).toLocaleString(), icon: AlertCircle, color: 'red' },
  ] : []

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  const chartData = analytics?.dailyBreakdown?.slice(-7).map(d => ({
    day: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    sent: d.sent || 0,
    delivered: d.delivered || 0,
  })) || []

  const eventData = analytics?.byEvent
    ? Object.entries(analytics.byEvent)
        .map(([name, count]) => ({ name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), count }))
        .sort((a, b) => b.count - a.count).slice(0, 5)
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
            <Send className="w-4 h-4" />
            Send Test Message
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          Could not load data: {error}
        </div>
      )}

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
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Message Activity</h2>
              <p className="text-sm text-gray-500">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-gray-600">Sent</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-gray-600">Delivered</span></div>
            </div>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="sent" stroke="#22c
