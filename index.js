const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');

const app = express();
const keys = require('./config/keys');
const port = process.env.PORT || 3000;

// Helmet setup to add some more security
app.use(helmet());

// Setup retrieval of POST data via body parser
app.use(bodyParser.json());

// Setup Mongoose/MongoDB
require('./services/mongoose')();

// Static files setup
app.use(express.static('./static'));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// Passport setup
require('./services/passport')(app);

// Routes setup
require('./routes/user-routes')(app);
require('./routes/item-routes')(app);

// Server setup
app.listen(port, (err, res) => {
  if (err) {
    console.log(`Error happened when trying to listen to server on port ${port}`);
  }
  else {
    console.log(`Listening to server on port ${port}`);
  }
});
