const mongoose = require('mongoose');

const keys = require('../config/keys');
require('../models/user');

module.exports = () => {
  mongoose.connect(keys.mongoURI);
};