const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Helmet setup to add some more security
app.use(helmet());

// Static files setup
app.use(express.static(path.join(__dirname, 'static')));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// Routes setup
const userRoutes = require(path.join(__dirname, 'routes', 'user-routes'));
app.use('/user', userRoutes);

// Server setup
app.listen(port, (err, res) => {
  if (err) {
    console.log(`Error happened when trying to listen to server on port ${port}`);
  }
  else {
    console.log(`Listening to server on port ${port}`);
  }
});
