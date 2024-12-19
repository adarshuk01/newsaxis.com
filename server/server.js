const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const { uploadAllImages } = require('./config/cloudnaryConfig'); // Import the upload function
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
