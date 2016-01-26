/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var passport = require('passport');
module.exports = {
  create: function(req, res) {
    console.log('on create session', req.body);
    passport.authenticate('local', function(err, user, info) {
      console.log('trying to login', user)
      if(err){ return res.json(500, err);}
      if(!user){ return res.json(422, info); }
      req.logIn(user, function(err){
        if(err) return res.json(401, err);
        Session.update({user: user.id}, {user: user.id, active: true}).exec(function(err, session){
          if(err){ return res.json(500, err); }
          return res.json({session: session.shift(), auth: req.user});
        });
      })
      
    })(req, res);
  },

  destroy: function(req, res) {
    // need to be able to login via browser before attempting this. 
    // make sure its the user logging out their own session and that it is an active sesssion
    req.logout();

  },

  findOne: function(req, res){
    Session.findOne({id: req.params.id}).populate('user').exec(function(err, session){
      if(err) return res.json(500, err);
      return res.json(session);
    });
  },

};

