const express = require('express');
const router = express.Router();
const newsController = require('../controller/manoramaNews');

// Middleware to set CORS headers
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://newsaxis.vercel.app'); // Allow the specific frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials if needed
  next();
});

// Define routes
router.get('/:type', newsController.getNews);          // Fetch general news
router.get('/reels/:type', newsController.getReels);   // Fetch reels
router.get('/banner/:type', newsController.getBanner); // Fetch banners

module.exports = router;
