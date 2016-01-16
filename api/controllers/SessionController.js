/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	

  // log the user in
  create: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if(err){ return es.json(500, err); }
      else if(!user){ return res.json(422, {message: 'Bad Email/Password'})}
      else 
        req.logIn(user, function(err){
          if(err){ return res.json(500, err);}
          else 
            Session.findOrCreate({user: user.id, logged_out: false}).exec(function(err, session){
              if(err){ return res.json(500, err); }
              User.update({id: user.id}, {session: session.id}).exec(function(err, log){
                if(err) return res.json(500, err);
                return res.json(session);
              });              
            });
            
        });
    })(req, res);
  },

  // TODO: Requires self or admin to destroy session
  destroy: function(req, res){

    // okay, user has to be logged in - I AM NOT 100% sure on this - might need update
    if(!(req.session && req.session.passport && req.session.passport.user))
      return res.json(401, {});


    Session.update({id: req.params.id, user: req.session.passport.user}, {logged_out: true}).exec(function(err, session){
      if(err){ res.json(500, err); }
      else
        req.logOut();
        return res.json({});
    });
  },

  // TODO: Role based, only admin can see who is logged in 
  // not meant to be public.... so will eventually need to be authed and cross-referenced aganst role
  find: function(req, res){
    Session.find().populate('user').exec(function(err, sessions){
      if(err) return res.json(500, err);
      else return res.json(sessions);
    });
  }
};

