const jwt = require('jsonwebtoken');
const keys= require('../config/keys');

module.exports = {
  signJwt: (jwtData) => {
    const signedJwt = jwt.sign({ data: jwtData }, keys.jwtSecret);
    return signedJwt;
  },  
};
