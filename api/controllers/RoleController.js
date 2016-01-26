/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


// all CRUD ops need admin role
module.exports = {
	create: function(req, res){
    Role.create(req.body).exec(function(err, role){
      if(err) return res.json(err.status || 500, err);
      return res.json(role);
    });
  },
  find: function(req, res){
    Role.find().exec(function(err, roles){
      if(err) return res.json(err.status || 500, err);
      return res.json(roles);
    });
  },
  findOne: function(req, res){
    Role.findOne({id: req.params.id}).exec(function(err, role){
      if(err) return res.json(err.status || 500, err);
      return res.json(role);
    });
  },
  update: function(req,res){
    Role.update({id: req.params.id}, req.body).exec(function(err, role){
      if(err) return res.json(err.status || 500, err);
      return res.json(role);
    })
  },
  destroy: function(req, res){
    console.log('destroying', req.params.id)
    Role.destroy({id: req.params.id}).exec(function(err){
      if(err) return res.json(err.status || 500, err);
      return res.json({});
    })
  }

};

