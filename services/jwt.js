const jwt = require('jsonwebtoken');
const keys= require('../config/keys');

module.exports = {
  signJwt: (jwtData) => jwt.sign(
    { data: jwtData },
    keys.jwtSecret,
    { expiresIn: 24 * 60 * 60 },
  ),
  verifyJwt: (jwtToken) => jwt.verify(jwtToken, keys.jwtSecret),
};
