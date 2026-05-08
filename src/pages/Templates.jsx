import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag,
  Truck,
  Package,
  CreditCard,
  RefreshCw,
  Edit,
  Eye
} from 'lucide-react'

function Templates() {
  const [filter, setFilter] = useState('all')

  const templates = [
    {
      id: 1,
      name: 'Order Confirmation',
      category: 'TRANSACTIONAL',
      status: 'approved',
      icon: ShoppingBag,
      color: 'green',
      preview: "Hi {{1}}! 🎉 Your order #{{2}} for {{3}} has been confirmed. Total: {{4}}. We'll notify you once shipped!",
      lang: 'English',
      sent: 4520,
    },
    {
      id: 2,
      name: 'Order Shipped',
      category: 'SHIPPING',
      status: 'approved',
      icon: Truck,
      color: 'blue',
      preview: "📦 Great news {{1}}! Your order #{{2}} has been shipped. Track here: {{3}}. Estimated delivery: {{4}}",
      lang: 'English',
      sent: 3890,
    },
    {
      id: 3,
      name: 'Order Delivered',
      category: 'DELIVERY',
      status: 'approved',
      icon: Package,
      color: 'purple',
      preview: "✅ Hi {{1}}, your order #{{2}} has been delivered! We hope you love it. Leave a review: {{3}}",
      lang: 'English',
      sent: 3210,
    },
    {
      id: 4,
      name: 'Order Cancelled',
      category: 'TRANSACTIONAL',
      status: 'approved',
      icon: XCircle,
      color: 'red',
      preview: "Hi {{1}}, your order #{{2}} has been cancelled. Refund of {{3}} will be processed within 5-7 days.",
      lang: 'English',
      sent: 247,
    },
    {
      id: 5,
      name: 'Refund Issued',
      category: 'PAYMENT',
      status: 'approved',
      icon: RefreshCw,
      color: 'orange',
      preview: "💰 {{1}}, your refund of {{2}} for order #{{3}} has been issued. It will reflect in 3-5 business days.",
      lang: 'English',
      sent: 180,
    },
    {
      id: 6,
      name: 'Payment Confirmation',
      category: 'PAYMENT',
      status: 'pending',
      icon: CreditCard,
      color: 'indigo',
      preview: "Hi {{1}}, payment of {{2}} for order #{{3}} received. Thank you for your purchase!",
      lang: 'English',
      sent: 0,
    },
  ]

  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(t => t.status === filter)

  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-500 mt-1">Manage your WhatsApp notification templates</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Templates</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{templates.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{templates.filter(t => t.status === 'approved').length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{templates.filter(t => t.status === 'pending').length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sent This Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12,047</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
          {['all', 'approved', 'pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                filter === f 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[template.color]}`}>
                <template.icon className="w-5 h-5" />
              </div>
              {template.status === 'approved' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3 h-3" />
                  Approved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  <Clock className="w-3 h-3" />
                  Pending
                </span>
              )}
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">{template.category}</p>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
              <p className="text-xs text-gray-700 leading-relaxed">{template.preview}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>🌐 {template.lang}</span>
              <span>{template.sent.toLocaleString()} sent</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-xs py-2">
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button className="flex-1 btn-secondary text-xs py-2">
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Templates
