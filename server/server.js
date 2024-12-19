const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const { uploadAllImages } = require('./config/cloudnaryConfig'); // Import the upload function
const dotenv = require('dotenv');
const { instapost } = require('./controller/instaPostController');

dotenv.config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: ['https://newsaxis.vercel.app', 'http://localhost:3000'], // Allowed origins
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS with options
app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Mount the routes
app.use('/api/news', newsRoutes);

// Define a test route to ensure CORS is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Define the port
const PORT = process.env.PORT || 5002;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
