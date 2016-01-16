/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // Todo: Will need an email confirmation to activate account
  create: function(req,res){
    User.create(req.body).exec(function(err, user){
      if(err) return res.json(422,err);
      else return res.json(user);
    });
  },

  // TOOD: Must be role based, Minimum role user
	find: function(req, res){
    User.find().exec(function(err,users){
      if(err) return res.json(500, err);
      else return res.json(users);
    });
  },

  // TODO: Must be role based. Minimum role user
  findOne: function(req, res){
    User.findOne({id: req.params.id}).populate('session').exec(function(err, user){
      if(err) return res.json(500,err);
      else return res.json(user);
    });
  },

  // TODO: Only self user (or admin) can turn off accounts. Needs middleware
  destroy: function(req, res){
    User.update({id: req.params.id}, {active: false}).exec(function(err, user){
      if(err) return res.json(500, err);
      Session.update({user: user.id}, {logged_out: true}).exec(function(err, session){
        if(err) return res.json(500,err);
        return res.json({});
      });
    });
  }

};


