const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: ['https://newsaxis.vercel.app', 'http://localhost:3000'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser
app.use(bodyParser.json());

// News routes
app.use('/api/news', newsRoutes);

// Define the port
const PORT = process.env.PORT || 5002;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
