import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { configureApiRoutes } from './src/server/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure portfolio API backend routes
configureApiRoutes(app);

// Serve Vite-compiled static assets in static mode
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback all other client route requests to index.html for React SPA router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Production Server running on port ${PORT}`);
});
