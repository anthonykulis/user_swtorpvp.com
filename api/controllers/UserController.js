/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
    res.json({works: true});
  },

  create: function(req,res){
    User.create(req.body).exec(function(err, user){
      if(err){
        res.json(err);
      }
      else{
        res.json(user);
      }
    });
  }
};

