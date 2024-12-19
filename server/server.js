const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes'); // Ensure this path is correct
const app = express();

// Allow requests from the frontend
const corsOptions = {
  origin: 'https://newsaxis.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// Middleware to parse the body of the request
app.use(bodyParser.json());

// Use the newsRoutes for API endpoints
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
