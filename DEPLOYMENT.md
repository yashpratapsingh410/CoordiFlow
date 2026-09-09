# 🚀 CoordiFlow Deployment Guide (Vercel + Render / Netlify + MongoDB Atlas)

This guide explains step-by-step how to deploy both the **Frontend (React + Tailwind)** and **Backend (Node.js + Express + MongoDB)** to free cloud hosting services.

---

## 🟢 Step 1: Push Code to GitHub

1. Initialize Git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CoordiFlow Coordination Intelligence System"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/CoordiFlow.git
   git branch -M main
   git push -u origin main
   ```

---

## 🍃 Step 2: Set Up Free MongoDB Database (MongoDB Atlas)

1. Sign up for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Create Cluster** and select the **M0 Free Shared Tier**.
3. Under **Database Access**, create a database user (e.g. username: `admin`, password: `your_password`).
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect** -> **Connect your application** and copy the URI:
   ```text
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/coordiflow?retryWrites=true&w=majority
   ```

---

## ⚡ Step 3: Deploy Backend Server (Render.com - Free Tier)

1. Sign up at [Render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `CoordiFlow`.
4. Configure service settings:
   - **Name**: `coordiflow-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`
5. Under **Environment Variables**, add:
   - `MONGO_URI`: *(Your MongoDB Atlas URI from Step 2)*
   - `PORT`: `5000`
6. Click **Create Web Service**. Your backend API will be live at:
   `https://coordiflow-backend.onrender.com`

---

## 🎨 Step 4: Deploy Frontend (Vercel - Recommended)

1. Sign up at [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project** and import your GitHub repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://coordiflow-backend.onrender.com/api`
5. Click **Deploy**. Vercel will give you a live production URL like:
   `https://coordiflow.vercel.app`

---

## 🛠️ Step 5: Quick Production Checklist

- [x] Tested production build locally (`npm run build`).
- [x] Express backend configured with CORS support for production domains.
- [x] Fallback in-memory database enabled if MongoDB URI is not set.

🎉 **Congratulations! Your CoordiFlow Coordination Intelligence System is now deployed live to the web!**
