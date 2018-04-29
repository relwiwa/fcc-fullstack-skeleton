const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

module.exports = (app) => {
  app.post(
    '/user/signup',
    (req, res) => {
      // missing: validate email, passwort and nosql injection
      User.findOne({ email: req.body.email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(500).json({
            message: 'Signup error: User already exists',
          });
        }
        else {
          const rounds = 10;
          bcrypt.hash(req.body.password, rounds)
          .then(saltedPasswordHash => {
            new User({
              email: req.body.email,
              password: saltedPasswordHash,
            })
            .save()
            .then(newUser => {
              return res.status(201).json({
                message: 'New user was signed up successfully',
              });
            })
            .catch(error => {
              return res.status(500).json({
                message: 'Unexpected error: Signing up new user in database failed',
              });
            });
          })
          .catch(error => {
            return res.status(500).json({
              message: 'Unexpected error related to user password',
            });
          });
        }
      })
      .catch(error => {
        return res.status(500).json({
          message: 'Unexpected error while checking for existing user',
        });
      });
    }
  );

  app.post('/user/signin', (req, res, next) => {
    passport.authenticate('local', (err, userJwt, info) => {
      if (err) {
        return res.status(500).json({
          message: 'Authentication failed: An unexpected error happened',
        });
      }
      if (!userJwt) {
        return res.status(401).json({
          message: 'Authentication failed: Username and/or password were not correct',
        });
      }
      else {
        return res.status(201).json({
          message: 'Authentication succeeded: User was signed in successfully',
          userId: userJwt,
        });  
      }
    })(req, res, next);
  });

};
