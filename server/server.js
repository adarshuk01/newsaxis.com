const cors = require('cors');

const app = express();

// Allow requests from the frontend
const corsOptions = {
  origin: 'https://newsaxis.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
