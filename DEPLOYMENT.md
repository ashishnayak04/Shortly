# Deployment Guide

## Architecture

```
User → Vercel (Frontend) → Render (Backend) → MongoDB Atlas
```

---

## 1. MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create a free M0 cluster
3. Under Security → Database Access → Add New User
4. Under Security → Network Access → Add IP Whitelist (0.0.0.0/0 for production)
5. Click Connect → Drivers → Copy connection string
6. Replace `<password>` and `<dbname>`:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/shortly?retryWrites=true&w=majority
   ```

---

## 2. Backend — Render

1. Create account at https://render.com
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `shortly-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: (from Atlas)
   - `BASE_URL`: `https://shortly-api.onrender.com`
   - `CLIENT_URL`: `https://shortly.vercel.app`
6. Click **Create Web Service**

---

## 3. Frontend — Vercel

1. Install Vercel CLI or use vercel.com
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `client`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - None needed (proxy handled by Vite)
5. Click **Deploy**

### Alternative: Custom API Domain

If your backend is on a different domain, update `client/vite.config.js`:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } },
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://shortly-api.onrender.com'),
  },
})
```

Then update `client/src/services/api.js`:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})
```

---

## 4. Verify Deployment

- Frontend: https://shortly.vercel.app
- Backend Health: https://shortly-api.onrender.com/health
- API Example: https://shortly-api.onrender.com/api/urls

---

## Production Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong MongoDB user password
- [ ] CORS origin locked to your domain
- [ ] `NODE_ENV=production` set
- [ ] Rate limiting added (optional but recommended)
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (auto on Vercel/Render)
