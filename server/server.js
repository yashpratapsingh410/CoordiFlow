import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints Router
app.use('/api', apiRoutes);

// Root Healthcheck
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: white; min-height: 100vh;">
      <h1 style="color: #38bdf8;">CoordiFlow Backend API Server</h1>
      <p style="color: #94a3b8;">Status: <strong style="color: #4ade80;">Active & Running on Port ${PORT}</strong></p>
      <hr style="border-color: #334155; margin: 1.5rem 0;" />
      <h3>Available REST Endpoints:</h3>
      <ul>
        <li><code>GET /api/health</code> - Health status check</li>
        <li><code>GET /api/projects</code> - List active projects</li>
        <li><code>GET /api/alerts/current</code> - Get active Intelligent Change Alert</li>
        <li><code>POST /api/alerts/impact-analysis</code> - Generate new impact cascade</li>
        <li><code>PATCH /api/alerts/notify</code> - Notify affected stakeholder</li>
        <li><code>PATCH /api/alerts/reassign</code> - Re-assign task</li>
        <li><code>GET /api/memory</code> - Get vertical timeline audit logs</li>
        <li><code>POST /api/memory</code> - Add new log entry</li>
      </ul>
    </div>
  `);
});

import { seedDatabase } from './seed.js';

// Optional MongoDB Connection (Mongoose)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coordiflow';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('🟢 Connected to MongoDB Database successfully!');
    await seedDatabase();
  })
  .catch((err) => {
    console.log('ℹ️ MongoDB Atlas URI pending; running with Express In-Memory Data Store.');
  });

app.listen(PORT, () => {
  console.log(`🚀 CoordiFlow Express Backend API running at http://localhost:${PORT}`);
});
