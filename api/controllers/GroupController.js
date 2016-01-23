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
    // being an update, make sure id passed is id in body
    req.body.id = req.params.id;

    // no roles here, will break
    delete req.body.roles;

    Group.update(req.params.id, req.body).exec(function(err, group){
      if(err) return res.json(err.status || 500, err);
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
    if(!(req.body.roles && _.isArray(req.body.roles))){
      error = {
        error: 'E_VALIDATION',
        status: 422,
        summary: '1 attribute is invalid',
        invalidAttributes: {
          roles: [{
            message: "Roles must be an array of ids"
          }]
        }
      };
      return res.json(422, error);
    }
    Group.findOne(req.params.group_id).exec(function(err, group){
      if(err) return res.json(err.status || 500);
      _.each(req.body.roles, function(id){
        group.roles.add(id);
      });
      group.save(function(err, save){
        if(err){
          return res.json(422, err);
        }
        return res.json(group);
      });

    });
  },

  removeRoles: function(req,res){
    return res.json(_.extend(req.body, req.params));
  },


};

