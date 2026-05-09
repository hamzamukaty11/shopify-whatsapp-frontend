const BACKEND_URL = 'https://shopify-whatsapp-backend-production.up.railway.app'
const SHOP_DOMAIN = 'bookvogue.myshopify.com'

const headers = {
  'Content-Type': 'application/json',
  'x-shopify-shop-domain': SHOP_DOMAIN,
}

export async function fetchAnalytics(days = 30) {
  const res = await fetch(BACKEND_URL + '/api/analytics?days=' + days, { headers })
  if (!res.ok) throw new Error('Failed to fetch analytics')
  return res.json()
}

export async function fetchLogs({ page = 1, limit = 20, status, event } = {}) {
  const params = new URLSearchParams({ page, limit })
  if (status) params.append('status', status)
  if (event) params.append('event', event)
  const res = await fetch(BACKEND_URL + '/api/logs?' + params, { headers })
  if (!res.ok) throw new Error('Failed to fetch logs')
  return res.json()
}

export async function fetchSettings() {
  const res = await fetch(BACKEND_URL + '/api/settings', { headers })
  if (!res.ok) throw new Error('Failed to fetch settings')
  return res.json()
}

export async function saveSettings(updates) {
  const res = await fetch(BACKEND_URL + '/api/settings', {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error('Failed to save settings')
  return res.json()
}

export async function fetchTemplates() {
  const res = await fetch(BACKEND_URL + '/api/templates', { headers })
  if (!res.ok) throw new Error('Failed to fetch templates')
  return res.json()
}

export async function saveTemplate(type, body) {
  const res = await fetch(BACKEND_URL + '/api/templates/' + type, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ body }),
  })
  if (!res.ok) throw new Error('Failed to save template')
  return res.json()
}

export async function sendTestMessage(phone) {
  const res = await fetch(BACKEND_URL + '/api/test-message', {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to send test message')
  return data
}

export async function fetchBilling() {
  const res = await fetch(BACKEND_URL + '/api/billing', { headers })
  if (!res.ok) throw new Error('Failed to fetch billing')
  return res.json()
}

export async function upgradePlan(plan) {
  const res = await fetch(BACKEND_URL + '/api/billing/upgrade', {
    method: 'POST',
    headers,
    body: JSON.stringify({ plan }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to upgrade plan')
  return data
}

export async function toggleAutomation(type, enabled) {
  const res = await fetch(BACKEND_URL + '/api/automations/' + type, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ enabled }),
  })
  if (!res.ok) throw new Error('Failed to update automation')
  return res.json()
}
