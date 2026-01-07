# Vercel Deployment Instructions

## ✅ What Was Created

A **static flight search portal** that connects to 6 major comparison websites:
- Google Flights
- Kayak
- Skyscanner
- Momondo
- Expedia
- Priceline

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Select your repository**: `googleflight_scraper`
5. **Click "Deploy"**
6. **Done!** Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/admin/GIT/googleflights/googleflight_scraper
vercel

# Follow prompts:
# - Link to existing project? No
# - What's the name? flight-search
# - Which directory? ./
# - Deploy? Yes
```

## 🌐 Add Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `flightfinder.com`)
4. Update DNS records as shown by Vercel
5. Wait 24-48 hours for SSL certificate

## 📁 Project Structure

```
public/
├── index.html      # Main search page
├── css/
│   └── portal.css  # Styling
└── js/
    └── portal.js   # Search logic
vercel.json         # Vercel config
```

## 🎯 How It Works

1. **User enters**: Origin, Destination, Date
2. **JavaScript builds URLs** for each comparison site
3. **User clicks site card** → Opens that site in new tab
4. **User compares prices** across multiple sites
5. **User books** on their preferred site

## 💡 No Backend Needed!

- ✅ Pure static HTML/CSS/JS
- ✅ Instant page load
- ✅ Free hosting on Vercel
- ✅ Automatic HTTPS
- ✅ Global CDN

## 🔥 Features

- **6 comparison sites** integrated
- **Mobile responsive** design
- **Modern UI** with gradients
- **Fast** - no scraping delays
- **Reliable** - no API dependencies

## 📊 Comparison

| Feature | Static Portal (Vercel) | Scraper (Render) |
|---------|----------------------|-------------------|
| Speed | ⚡ Instant | 🐌 30-90 seconds |
| Cost | 💰 Free | 💰 Free (limited) |
| Reliability | ✅ 99.9% | ⚠️ May break |
| Deployment | ✅ Vercel | ✅ Render |
| Custom Domain | ✅ Yes | ✅ Yes |
| API Needed | ❌ No | ✅ Browserless.io |

## 🎉 You Now Have Both!

- **Static Portal (Vercel)**: Fast, user-facing search page
- **Scraper API (Render)**: Advanced features, price monitoring

Use whichever fits your needs!
