import { useState, useEffect } from 'react'
import { Crown, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { fetchBilling, upgradePlan } from '../api'

function Profile() {
  const [billing, setBilling] = useState(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { loadBilling() }, [])

  async function loadBilling() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchBilling()
      setBilling(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpgrade(planId) {
    setUpgrading(planId)
    setError(null)
    try {
      const data = await upgradePlan(planId)
      if (data.confirmationUrl) {
        window.top.location.href = data.confirmationUrl
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setUpgrading(null)
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      messages: '50 messages/month',
      features: ['Basic notifications', 'Email support'],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$4.99',
      messages: '1,250 messages/month',
      features: ['All notifications', '7-day free trial', 'Email support'],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$9.99',
      messages: '2,500 messages/month',
      features: ['All notifications', '7-day free trial', 'Priority support', 'Analytics'],
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$14.99',
      messages: '4,250 messages/month',
      features: ['Everything in Growth', '7-day free trial', 'Advanced analytics', 'Custom templates'],
    },
  ]

  const currentPlan = billing ? plans.find(p => p.id === billing.plan) || plans[0] : null

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Account & Billing</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and billing</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}
        </div>
      )}

      {loading ? (
        <div className="card p-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 lg:p-8 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {currentPlan?.name || 'Free'} Plan
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{currentPlan?.price || '$0'}/month</h2>
                  <p className="text-green-50 text-sm">{currentPlan?.messages}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-100 uppercase tracking-wider">Status</p>
                  <p className="text-xl font-bold capitalize">{billing?.status || 'Active'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Messages Used</p>
                <p className="text-2xl font-bold text-gray-900">{(billing?.messagesUsedThisMonth || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">of {(billing?.messagesLimit || 50).toLocaleString()} this month</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Store</p>
                <p className="text-sm font-bold text-gray-900">bookvogue.myshopify.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Plan Status</p>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {billing?.status === 'active' ? 'Active' : billing?.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Available Plans</h2>
            <p className="text-sm text-gray-500 mb-6">7-day free trial on all paid plans. Upgrade anytime.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => {
                const isCurrent = billing?.plan === plan.id
                return (
                  <div key={plan.id} className={"rounded-xl border-2 p-5 " + (isCurrent ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white')}>
                    {isCurrent && (
                      <span className="inline-block px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded mb-3">CURRENT</span>
                    )}
                    <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                    <div className="my-3">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 text-sm">/mo</span>
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
                      onClick={() => { if (!isCurrent && plan.id !== 'free') handleUpgrade(plan.id) }}
                      disabled={isCurrent || plan.id === 'free' || upgrading === plan.id}
                      className={"w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 " + (isCurrent || plan.id === 'free' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer')}
                    >
                      {upgrading === plan.id && <Loader2 className="w-4 h-4 animate-spin" />}
                      {upgrading === plan.id ? 'Processing...' : isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Free' : 'Upgrade'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
