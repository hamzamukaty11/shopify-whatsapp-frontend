import { Clock, ShoppingBag, Truck, Package, XCircle, RefreshCw, ExternalLink } from 'lucide-react'

function Templates() {
  const templates = [
    {
      id: 1,
      name: 'Order Confirmation',
      metaName: 'order_confirmed',
      icon: ShoppingBag,
      color: 'green',
      preview: 'Hi [name]! Your order #[number] has been confirmed. Total: [currency] [amount]. We will notify you once it ships. Thank you for shopping with us!',
    },
    {
      id: 2,
      name: 'Order Shipped',
      metaName: 'order_shipped',
      icon: Truck,
      color: 'blue',
      preview: 'Hi [name]! Your order #[number] has been shipped. Carrier: [carrier]. Tracking: [number]. Expected delivery: [date]. Reply here if you have questions!',
    },
    {
      id: 3,
      name: 'Order Delivered',
      metaName: 'order_delivered',
      icon: Package,
      color: 'purple',
      preview: 'Hi [name]! Your order #[number] has been delivered. We hope you love your purchase! If anything is wrong, please reply within 48 hours.',
    },
    {
      id: 4,
      name: 'Order Cancelled',
      metaName: 'order_cancelled',
      icon: XCircle,
      color: 'red',
      preview: 'Hi [name], your order #[number] has been cancelled. A refund of [currency] [amount] will be returned within 5-7 business days.',
    },
    {
      id: 5,
      name: 'Abandoned Cart',
      metaName: 'abandoned_cart',
      icon: RefreshCw,
      color: 'orange',
      preview: 'Hi [name]! You left items in your cart. Total: [currency] [amount]. Complete your purchase here: [url]. This link expires in 24 hours!',
    },
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
          <p className="text-gray-500 mt-1">WhatsApp notification templates submitted to Meta for approval</p>
        </div>
        
          href="https://business.facebook.com/wa/manage/message-templates"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <ExternalLink className="w-4 h-4" />
          Manage in Meta
        </a>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
        Your 5 templates have been submitted to Meta for review. Approval usually takes a few hours to 24 hours. Once approved they will be used automatically for all order notifications.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Templates</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{templates.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Submitted</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{templates.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{templates.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={"w-10 h-10 rounded-lg flex items-center justify-center " + colorClasses[template.color]}>
                <template.icon className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                <Clock className="w-3 h-3" />
                Pending
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">{template.metaName}</p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-xs text-gray-700 leading-relaxed">{template.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Templates
