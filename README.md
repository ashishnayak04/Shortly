# Shortly - URL Shortener SaaS

A modern, production-ready URL shortening platform built with React, Node.js, Express, and MongoDB.

## Features

- **URL Shortening** — Generate short, shareable links instantly
- **Custom Aliases** — Create memorable custom short codes
- **QR Code Generation** — Auto-generated QR codes for every link
- **Link Expiration** — Set expiry dates (1 day, 7 days, 30 days, custom)
- **Click Analytics** — Track clicks, last visited, and engagement
- **Dark Mode UI** — Modern SaaS-style glassmorphism design
- **One-Click Copy** — Copy shortened URLs instantly
- **Responsive** — Fully responsive across all devices

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Libraries | nanoid, qrcode, validator, axios, react-hot-toast, lucide-react |

## Quick Start

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd shortly

# Install backend dependencies
cd server
cp .env.example .env
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Configure Environment

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shortly
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

### Run

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/urls` | Create short URL |
| GET | `/:shortCode` | Redirect to original URL |
| GET | `/api/urls` | Get all URLs |
| GET | `/api/urls/:shortCode/stats` | Get analytics |
| DELETE | `/api/urls/:shortCode` | Delete URL |

### Create Short URL

```json
POST /api/urls
{
  "longUrl": "https://example.com/very-long-url",
  "customAlias": "my-link",
  "expiresAt": "2025-12-31T23:59:00Z"
}
```

## Project Structure

```
shortly/
├── server/                  # Backend
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/       # Error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Validators
│   ├── .env
│   └── server.js
│
├── client/                  # Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   └── layouts/         # Layout components
│   ├── index.html
│   └── vite.config.js
│
├── .env.example
└── README.md
```

## Deployment

### Backend — Render

1. Create a Render Web Service
2. Set root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env.example`

### Frontend — Vercel

1. Import project to Vercel
2. Set root directory: `client`
3. Framework: Vite
4. Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com`
5. Deploy

### Database — MongoDB Atlas

1. Create free cluster on atlas.mongodb.com
2. Get connection string
3. Set as `MONGODB_URI` in backend environment

## Future Improvements

- User authentication (JWT / OAuth)
- Rate limiting per IP/user
- Link password protection
- Bulk URL shortening
- Browser extension
- Click geolocation & device analytics
- Public API with API keys
- Team collaboration & workspaces
- Custom domains for branded links

## Resume Description

> **Shortly** — A full-stack URL Shortener SaaS built with React, Node.js, Express, and MongoDB. Features include custom aliases, QR code generation, link expiration, and click analytics. Demonstrates RESTful API design, clean architecture, async/await patterns, centralized error handling, responsive dark-mode UI with glassmorphism design, and production-ready deployment on Vercel + Render + MongoDB Atlas.
