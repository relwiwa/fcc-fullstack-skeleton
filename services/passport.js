const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');

const signJwt = require('./jwt').signJwt;
const User = mongoose.model('users');

module.exports = (app) => {
  passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    // refactor to usage of Promises
    (username, password, done) => {
      User.findOne({ email: username })
      // db query was successful
      .then(existingUser => {
        // user with this email does exist, so check password
        if (existingUser) {
          bcrypt.compare(password, existingUser.password)
          .then(passwordCompareResult => {
            // password did match
            if (passwordCompareResult) {
              const jwt = signJwt(existingUser.id);
              done(null, jwt);
            }
            // password did not match
            else {
              done(null, false);
            }
          })
          .catch(error => {
            // error in bycrypt.compare
            done(error, false);
          });
        }
        // user with this email did not exists
        else {
          done(null, false);
        }
      })
      // db query was not successful
      .catch(error => {
        done(error);
      });
    },
  ));

  app.use(passport.initialize());
  
};
