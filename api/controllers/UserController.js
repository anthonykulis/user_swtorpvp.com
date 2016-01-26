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
      if(err) return res.json(500, err);
      Session.create({user: user.id, active: false}).exec(function(err, session){
        if(err) return res.json(500, err);
        Profile.create({user: user.id}).exec(function(err, profile){
          User.update({id: user.id}, {session: session.id, profile: profile.id}).exec(function(err, user){
            if(err) return res.json(500, err);
            return res.json(user);
          });
        });
      });
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
    User
    .findOne({id: req.params.id})
    .populate('session')
    .populate('profile')
    .populate('groups')
    .exec(function(err, user){
      if(err) return res.json(500,err);
      user.isAuthenticated = req.isAuthenticated();
      else return res.json(user);
    });
  },

  // TODO: Must be role based. User or Admin
  update: function(req, res){
    // right now, only emails
    email = req.body.email;
    User.update({id: req.params.id}, {email: email}).exec(function(err, user){
      if(err) return res.json(500, err);
      return res.json(user);
    });
  },

  // TODO: Must be user only
  patch: function(req,res){
    pwd = req.body.password;
    pwdc = req.body.password_confirmation;
    User.update({id: req.params.id}, {password: pwd, password_confirmation: pwdc}).exec(function(err, user){
      if(err) return res.json(422, err);
      return res.json(user); 
    })
  },

  // TODO: Only self user (or admin) can turn off accounts. Needs middleware
  destroy: function(req, res){
    User.update({id: req.params.id}, {active: false}).exec(function(err, user){
      if(err) return res.json(500, err);
      Session.update({user: user.id}, {active: false}).exec(function(err, session){
        if(err) return res.json(500,err);
        return res.json({});
      });

    });
  },

  addGroups: function(req, res){
    err = UserService.getGroupsAsError(req.body.groups);
    if(err) return res.json(422, err);
    UserService.manageGroups(req.params.user_id, req.body.groups, true, false, function(err, user){
      if(err){
        console.log(err);
        return res.json(err.status || 422, err);
      }
      return res.json(user);
    })
  },
  removeGroups: function(req,res){
    err = UserService.getGroupsAsError(req.body.groups);
    if(err) return res.json(422, err);
    UserService.manageGroups(req.params.user_id, req.body.groups, false, true, function(err, user){
      if(err){
        console.log(err);
        return res.json(err.status || 422, err);
      }
      return res.json(user);
    })   
  }


};


