/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
    User.find().exec(function(err,users){
      if(err) res.json(500, err);
      else res.json(users);
    });
  },

  create: function(req,res){
    User.create(req.body).exec(function(err, user){
      console.log('created user', err, user);
      if(err){
        res.json(422,err);
      }
      else{
        res.json(user);
      }
    });
  }
};

