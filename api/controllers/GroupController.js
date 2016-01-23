/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


// all CRUD ops need admin role
module.exports = {
  create: function(req, res){
    Group.create(req.body).exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json(group);
    });
  },
  find: function(req, res){
    Group.find().exec(function(err, groups){
      if(err) return res.json(err.status || 500, err);
      return res.json(groups);
    });
  },
  findOne: function(req, res){
    Group.findOne({id: req.params.id}).populate('roles').exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json(group);
    });
  },
  update: function(req,res){
    Group.update({id: req.params.id}, req.body).exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json(group);
    })
  },
  destroy: function(req, res){
    Group.destroy({id: req.params.id}).exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json({});
    })
  }

};

