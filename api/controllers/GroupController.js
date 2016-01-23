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
    Group.findOne({id: req.params.id}).populate('roles').populate('users').exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json(group);
    });
  },
  update: function(req,res){
    // being an update, make sure id passed is id in body
    req.body.id = req.params.id;

    // no roles here, will break
    delete req.body.roles;

    Group.update(req.params.id, req.body).exec(function(err, group){
      if(err){ return res.json(err.status || 500, err); }
      return res.json(group);
    })
  },
  destroy: function(req, res){
    Group.destroy({id: req.params.id}).exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
      return res.json({});
    })
  },

  // custom routes
  addRoles: function(req,res){
    error = GroupService.getRolesAsError(req.body.roles);
    if(error) return res.json(error.status, error);
    GroupService.manageRoles(req.params.group_id, req.body.roles, true, false, function(err, group){
      if(err) return res.json(err.status || 422, err);
      return res.json(group);
    });
  },

  removeRoles: function(req,res){
    error = GroupService.getRolesAsError(req.body.roles);
    if(error) return res.json(error.status, error);
    GroupService.manageRoles(req.params.group_id, req.body.roles, false, true, function(err, group){
      if(err) return res.json(err.status || 422, err);
      return res.json(group);
    });
  },


};

