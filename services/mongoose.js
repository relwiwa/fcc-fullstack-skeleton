const mongoose = require('mongoose');

const keys = require('../config/keys');
require('../models/user');
require('../models/item');

module.exports = () => {
  mongoose.connect(keys.mongoURI);
};