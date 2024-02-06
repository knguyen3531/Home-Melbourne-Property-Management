const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/propertymanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// API Routes (if you have any)
// Example: const apiRoutes = require('./routes/apiRoutes');
// app.use('/api', apiRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
