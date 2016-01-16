/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
    User.find().exec(function(err,users){
      if(err) return res.json(500, err);
      else return res.json(users);
    });
  },

  findOne: function(req, res){
    User.findOne({id: req.params.id}).populate('session').exec(function(err, user){
      if(err) return res.json(500,err);
      else return res.json(user);
    });
  },

  create: function(req,res){
    User.create(req.body).exec(function(err, user){
      if(err) return res.json(422,err);
      else return res.json(user);
    });
  }
};


