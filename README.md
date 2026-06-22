<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

<h1 align="center">🔗 Shortly — URL Shortener SaaS</h1>

<p align="center">
  A modern, full-stack URL shortening platform with custom aliases, QR codes, click analytics, and link expiration.
  <br>
  <strong>Built with React 19, Node.js, Express, MongoDB, and Tailwind CSS v4.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#api">API</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| **URL Shortening** | Generate short, shareable links instantly |
| **Custom Aliases** | Create memorable custom short codes (e.g. `short.ly/my-link`) |
| **QR Code Generation** | Auto-generated, downloadable QR codes for every link |
| **Link Expiration** | Set expiry dates (1 day, 7 days, 30 days, or custom) |
| **Click Analytics** | Track total clicks, last visited time, and engagement |
| **Dark Mode** | Seamless light/dark theme with system preference detection |
| **One-Click Copy** | Copy shortened URLs and originals to clipboard instantly |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| **Link Management** | View, search, filter, and delete all your links |
| **Expired Link Handling** | Automatic 410 response for expired links |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (with TTL index for auto-expiry) |
| **Libraries** | nanoid (short codes), qrcode (QR generation), validator (URL validation), axios (HTTP), react-hot-toast (notifications), react-router-dom (routing) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Setup

```bash
# Clone the repository
git clone https://github.com/<your-username>/shortly.git
cd shortly

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shortly
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

### Run

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd client
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📡 API

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/urls` | Create a short URL |
| `GET` | `/api/urls` | List all shortened URLs |
| `GET` | `/:shortCode` | Redirect to original URL |
| `GET` | `/api/urls/:shortCode/stats` | Get analytics for a URL |
| `DELETE` | `/api/urls/:shortCode` | Delete a URL |
| `GET` | `/health` | Health check |

### Example: Create a Short URL

```json
POST /api/urls
{
  "longUrl": "https://example.com/very-long-url",
  "customAlias": "my-link",
  "expiresAt": "2025-12-31T23:59:00Z"
}
```

**Response:**

```json
{
  "message": "Short URL created successfully",
  "url": {
    "id": "...",
    "longUrl": "https://example.com/very-long-url",
    "shortCode": "my-link",
    "shortUrl": "http://localhost:5000/my-link",
    "qrCode": "data:image/png;base64,...",
    "clicks": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "expiresAt": "2025-12-31T23:59:00.000Z"
  }
}
```

**Response (List All / Stats):**

```json
{
  "shortCode": "my-link",
  "longUrl": "https://example.com/very-long-url",
  "shortUrl": "http://localhost:5000/my-link",
  "qrCode": "data:image/png;base64,...",
  "clicks": 42,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "lastVisited": "2025-06-15T14:30:00.000Z",
  "expiresAt": "2025-12-31T23:59:00.000Z"
}
```

---

## 📁 Project Structure

```
shortly/
├── server/                        # Backend (Node.js + Express)
│   ├── src/
│   │   ├── app.js                 # Express app setup (CORS, routes, error handler)
│   │   ├── config/db.js           # MongoDB connection
│   │   ├── controllers/           # Route handlers
│   │   ├── middleware/            # Error handler middleware
│   │   ├── models/Url.js          # Mongoose schema (URL model w/ TTL index)
│   │   ├── routes/                # API route definitions
│   │   ├── services/              # Business logic (nanoid, QR gen, CRUD)
│   │   └── utils/validators.js    # URL & alias validation
│   ├── server.js                  # Entry point
│   └── .env                       # Environment variables
│
├── client/                        # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/            # Navbar, UrlForm, ResultCard, UrlTable,
│   │   │                         # StatsCard, ExpirationSelector, LoadingSpinner
│   │   ├── pages/                 # Home, Analytics, NotFound
│   │   ├── services/api.js        # Axios API client
│   │   ├── context/ThemeContext.jsx # Dark mode with system preference detection
│   │   ├── hooks/useUrls.js       # URL state management hook
│   │   ├── utils/helpers.js       # Formatting, clipboard, expiration
│   │   ├── layouts/MainLayout.jsx # Navbar + Outlet
│   │   ├── App.jsx                # Route definitions
│   │   ├── main.jsx               # Entry point (BrowserRouter, ThemeProvider)
│   │   └── index.css              # Tailwind & custom styles
│   ├── index.html
│   └── vite.config.js             # Vite config with Tailwind & API proxy
│
└── README.md
```

---

## 🌐 Deployment

Deploy the stack for free on:

| Service | Role | Guide |
|---|---|---|
| [Render](https://render.com) | Backend (Node.js/Express) | Set root dir: `server`, start command: `npm start` |
| [Vercel](https://vercel.com) | Frontend (React/Vite) | Framework preset: Vite, root dir: `client` |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database (M0 free tier) | Whitelist `0.0.0.0/0` for production |

---

## 🗺️ Future Roadmap

- [ ] User authentication (JWT / OAuth)
- [ ] Rate limiting per IP / user
- [ ] Password-protected links
- [ ] Bulk URL shortening
- [ ] Browser extension
- [ ] Geolocation & device analytics
- [ ] Public API with API keys
- [ ] Team workspaces & collaboration
- [ ] Custom domains for branded links

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
