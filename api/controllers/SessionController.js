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
      if(err){ return res.json(500, err);}
      if(!user){ return res.json(422, {}); }
      Session.findOrCeate({id: req.params.id}, {user: user.id, active: true}).exec(function(err, session){
        if(err){ return res.json(500, err); }
        return res.json(session);
      });
    })(req, res);
  },

  destroy: function(req, res) {
    req.logout();
  }
};

