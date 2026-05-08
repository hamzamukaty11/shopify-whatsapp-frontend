import { 
  Crown, 
  CheckCircle2, 
  CreditCard, 
  Receipt,
  Building2,
  Mail,
  Globe,
  Calendar
} from 'lucide-react'

function Profile() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Account & Billing</h1>
        <p className="text-gray-500 mt-1">Manage your account information and subscription</p>
      </div>

      {/* Plan Card */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 lg:p-8 text-white">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Pro Plan</span>
              </div>
              <h2 className="text-3xl font-bold mb-1">$29/month</h2>
              <p className="text-green-50 text-sm">Unlimited messages • Priority support • Advanced analytics</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-100 uppercase tracking-wider">Next billing</p>
              <p className="text-xl font-bold">June 6, 2026</p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Messages Used</p>
            <p className="text-2xl font-bold text-gray-900">12,847</p>
            <p className="text-xs text-gray-500 mt-1">of unlimited</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Templates Active</p>
            <p className="text-2xl font-bold text-gray-900">5 / Unlimited</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Plans Comparison */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Available Plans</h2>
        <p className="text-sm text-gray-500 mb-6">Upgrade or change your subscription anytime</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Starter',
              price: '$9',
              messages: '500 messages/month',
              features: ['3 templates', 'Basic analytics', 'Email support'],
              current: false,
            },
            {
              name: 'Pro',
              price: '$29',
              messages: 'Unlimited messages',
              features: ['Unlimited templates', 'Advanced analytics', 'Priority support', 'Multiple languages'],
              current: true,
            },
            {
              name: 'Enterprise',
              price: '$99',
              messages: 'Unlimited + Premium API',
              features: ['Everything in Pro', 'Custom integrations', '24/7 phone support', 'Dedicated account manager'],
              current: false,
            },
          ].map((plan) => (
            <div 
              key={plan.name} 
              className={`rounded-xl border-2 p-5 ${plan.current ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'}`}
            >
              {plan.current && (
                <span className="inline-block px-2 py-0.5 bg-primary-500 text-white text-xs font-semibold rounded mb-3">
                  CURRENT
                </span>
              )}
              <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
              <div className="my-3">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-3">{plan.messages}</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-2 rounded-lg text-sm font-semibold ${
                  plan.current 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-whatsapp text-white hover:bg-whatsapp-dark'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Switch to ' + plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Store Name</p>
              <p className="text-sm font-medium text-gray-900">BookVogue</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Shopify Domain</p>
              <p className="text-sm font-medium text-gray-900">bookvogue.myshopify.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Owner Email</p>
              <p className="text-sm font-medium text-gray-900">owner@bookvogue.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Installed On</p>
              <p className="text-sm font-medium text-gray-900">May 6, 2026</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Receipt className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
          </div>
          <div className="space-y-3">
            {[
              { date: 'May 6, 2026', amount: '$29.00', status: 'Paid' },
              { date: 'Apr 6, 2026', amount: '$29.00', status: 'Paid' },
              { date: 'Mar 6, 2026', amount: '$29.00', status: 'Paid' },
            ].map((invoice, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Pro Plan - Monthly</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">{invoice.amount}</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 btn-secondary text-sm">
            View All Invoices
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
