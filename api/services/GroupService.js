
module.exports = {

  getRolesAsError: function(roles){
    if(!(roles && _.isArray(roles))){
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
      return error;
    }
  },
  manageRoles: function(group_id, roles, add, remove, cb){
    Group.findOne(group_id).exec(function(err, group){
      if(err) return cb(err);
      _.each(roles, function(id){
        if(add) group.roles.add(id);
        else if(remove) group.roles.remove(id);
      });

      group.save(function(err, save){
        console.log('save', err, save)
        cb(err, group);
      });

    });
  }

};