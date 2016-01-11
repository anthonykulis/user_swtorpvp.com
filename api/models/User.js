/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: {
      unique: true,
      required: true,
      email: true,
      type: 'string'
    },
    password: {
      required: true,
      type: 'string',
      minLength: 8
    },
    beforeCreate: function(user, cb) {
      if(user.password !== user.password_confirmation){
        // todo: needs to go to error parser/builder
        cb({error: 'Password does not match password confirmation'})
      }
      bcrypt.genSalt(16, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
          if(err){
            cb(err);
          }
          else {
            user.password = hash;
            cb();
          }
        });
      });
    }
  }
};

