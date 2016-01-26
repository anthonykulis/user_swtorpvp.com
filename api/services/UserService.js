// user service to hold various reusable and specialized methods
module.exports = {


  getGroupsAsError: function(groups){
    if(!(groups && _.isArray(groups))){
      error = {
        error: 'E_VALIDATION',
        status: 422,
        summary: '1 attribute is invalid',
        invalidAttributes: {
          groups: [{
            message: "Groups must be an array of ids"
          }]
        }
      };
      return error;
    }
  },
  
  manageGroups: function(user_id, groups, add, remove, cb){
    User.findOne(user_id).exec(function(err, user){
      if(err) return cb(err);
      _.each(groups, function(id){
        if(add) user.groups.add(id);
        else if(remove) user.groups.remove(id);
      });

      // will cause uniqueness issues, so just remove before
      delete user.email;
      user.save(function(err, save){
        cb(err, user);
      });

    });

    // User.update({id: user_id}, {groups: groups}).exec(function(err, user){
    //   cb(err, user);
    // });
  }



};