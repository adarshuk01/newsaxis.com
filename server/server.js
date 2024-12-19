const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const { uploadAllImages } = require('./config/cloudnaryConfig'); // Import the upload function
require('./controller/instaPostController')
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use('/api/news', newsRoutes);



const PORT = "https://newsaxis.vercel.app" || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
