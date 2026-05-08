# Auto Order Confirmation - Frontend Dashboard

Polished, production-ready React dashboard for the **Auto Order Confirmation** Shopify app. Built for stunning screenshots and merchant approval.

## ✨ Features

- 📊 **Dashboard Home** — Stats cards, charts, recent activity table
- 💬 **WhatsApp Connection** — Status, quality rating, business info
- 📝 **Message Templates** — Browse & manage notification templates
- ⚙️ **Notification Settings** — Toggle event triggers, language preferences
- 👤 **Account & Billing** — Plans, billing history, store info
- 📧 **Contact Page** — Support form (required by Privacy Policy)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.

### 3. Build for Production

```bash
npm run build
```

The build output goes to the `dist/` folder, ready to deploy.

## 🌐 Deploy to Vercel

### Option A: Push to GitHub & Auto-Deploy

1. Push this code to your GitHub repo
2. Vercel will auto-deploy from the `main` branch
3. Your dashboard goes live at: `https://project-8whq0.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel will detect Vite and configure everything automatically.

## 📂 Project Structure

```
shopify-whatsapp-frontend/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Sidebar + topbar layout
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Connect.jsx          # WhatsApp connection
│   │   ├── Templates.jsx        # Message templates
│   │   ├── Settings.jsx         # Notification settings
│   │   ├── Profile.jsx          # Account & billing
│   │   └── Contact.jsx          # Support form
│   ├── App.jsx                  # Routes
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design System

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router v6
- **Colors:** WhatsApp green (#25D366) primary, Shopify-inspired neutrals

## 📸 Screenshots Plan

For Shopify App Store submission, take these 5 screenshots at **1600x900**:

1. **Dashboard Home** (`/`) — Shows stats, charts, activity
2. **WhatsApp Connection** (`/connect`) — Connection status & features
3. **Templates** (`/templates`) — Template library
4. **Settings** (`/settings`) — Notification toggles
5. **Account** (`/profile`) — Plan & billing

## 🔗 Backend Integration

This frontend is designed to connect to the Railway backend at:
`https://shopify-whatsapp-backend-production.up.railway.app`

To wire up real data, update the dummy data in each page with API calls using `axios`.

Example:
```javascript
import axios from 'axios'

const API_URL = 'https://shopify-whatsapp-backend-production.up.railway.app'

const fetchStats = async () => {
  const { data } = await axios.get(`${API_URL}/api/stats`)
  return data
}
```

## 🔒 Privacy & Compliance

Footer links to:
- Privacy Policy: https://hamzamukaty11.github.io/privacy-policy/
- Cookie Policy: https://hamzamukaty11.github.io/privacy-policy/cookie-policy.html

## 📝 Customization

### Change the App Name

Update in:
- `index.html` (title tag)
- `src/components/Layout.jsx` (logo section)

### Change the Brand Color

Edit `tailwind.config.js`:
```javascript
colors: {
  whatsapp: {
    DEFAULT: '#25D366',  // Change this
    dark: '#128C7E',
    light: '#DCF8C6',
  }
}
```

### Update Store Name (BookVogue)

Search and replace `BookVogue` and `bookvogue.myshopify.com` with the dynamic merchant store name once connected to backend.

## 🐛 Troubleshooting

**Build fails on Vercel:**
- Make sure Node.js version is 18+ in Vercel project settings

**Tailwind classes not working:**
- Run `npm install` again
- Check `postcss.config.js` exists

**Charts not rendering:**
- Recharts requires a parent with explicit dimensions (uses `ResponsiveContainer`)

## 📞 Support

For issues, contact via the in-app Contact page or refer to your Privacy Policy contact email.

---

Built with ❤️ for Shopify merchants
