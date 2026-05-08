import { 
  TrendingUp, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Truck,
  Package,
  Send
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard() {
  const stats = [
    {
      name: 'Messages Sent',
      value: '12,847',
      change: '+18.2%',
      trend: 'up',
      icon: Send,
      color: 'green',
    },
    {
      name: 'Delivery Rate',
      value: '98.4%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'blue',
    },
    {
      name: 'Active Customers',
      value: '3,256',
      change: '+12.5%',
      trend: 'up',
      icon: MessageCircle,
      color: 'purple',
    },
    {
      name: 'Failed Messages',
      value: '47',
      change: '-8.3%',
      trend: 'down',
      icon: AlertCircle,
      color: 'red',
    },
  ]

  const chartData = [
    { day: 'Mon', sent: 1240, delivered: 1218 },
    { day: 'Tue', sent: 1580, delivered: 1554 },
    { day: 'Wed', sent: 1820, delivered: 1789 },
    { day: 'Thu', sent: 2100, delivered: 2068 },
    { day: 'Fri', sent: 2450, delivered: 2410 },
    { day: 'Sat', sent: 1890, delivered: 1856 },
    { day: 'Sun', sent: 1767, delivered: 1739 },
  ]

  const eventData = [
    { name: 'Order Confirmation', count: 4520 },
    { name: 'Order Shipped', count: 3890 },
    { name: 'Order Delivered', count: 3210 },
    { name: 'Order Cancelled', count: 247 },
    { name: 'Refund Issued', count: 180 },
  ]

  const recentActivity = [
    { id: 1, customer: 'Ahmed Khan', phone: '+92 300 1234567', event: 'Order Confirmation', time: '2 minutes ago', status: 'delivered' },
    { id: 2, customer: 'Sarah Johnson', phone: '+1 415 555 0123', event: 'Order Shipped', time: '5 minutes ago', status: 'delivered' },
    { id: 3, customer: 'Maria Garcia', phone: '+34 612 345 678', event: 'Order Delivered', time: '12 minutes ago', status: 'delivered' },
    { id: 4, customer: 'James Smith', phone: '+44 7700 900123', event: 'Order Confirmation', time: '18 minutes ago', status: 'delivered' },
    { id: 5, customer: 'Yuki Tanaka', phone: '+81 90 1234 5678', event: 'Order Shipped', time: '24 minutes ago', status: 'pending' },
    { id: 6, customer: 'Pierre Dubois', phone: '+33 6 12 34 56 78', event: 'Order Confirmation', time: '31 minutes ago', status: 'delivered' },
  ]

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, BookVogue 👋</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your WhatsApp notifications today.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            Export Report
          </button>
          <button className="btn-primary">
            <Send className="w-4 h-4" />
            Send Test Message
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line chart - Messages over time */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Message Activity</h2>
              <p className="text-sm text-gray-500">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Sent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Delivered</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: '#fff', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="sent" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} />
              <Line type="monotone" dataKey="delivered" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart - By event type */}
        <div className="card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Notifications</h2>
            <p className="text-sm text-gray-500">Most sent this week</p>
          </div>
          <div className="space-y-4">
            {eventData.map((item, idx) => {
              const max = Math.max(...eventData.map(d => d.count))
              const percentage = (item.count / max) * 100
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500">Latest notifications sent to customers</p>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
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
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {activity.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{activity.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{activity.phone}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {activity.event}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{activity.time}</td>
                  <td className="px-6 py-4">
                    {activity.status === 'delivered' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
