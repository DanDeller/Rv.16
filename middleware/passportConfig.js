const localStrategy = require('passport-local').Strategy,
      User = require('./userSchema'),
      bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          
          if (result === true) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err, user) => {
      if (err) throw err;
      cb(err, user);
    });
  });
};