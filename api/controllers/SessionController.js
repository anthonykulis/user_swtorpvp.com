/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
module.exports = {
  create: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
    })(req, res);
  },

  destroy: function(req, res) {
    req.logout();
  }
};

