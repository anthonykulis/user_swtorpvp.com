/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

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
    emails_allowed: {
      type: 'boolean'
    },
    password_confirmation: {
      type: 'string',
      required: true,
      minLength: 8
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        delete user.password_confirmation;
        return obj;
    }
  },
  // beforeCreate: function(user, cb) {
  //   console.log(user);
  //   if(user.password !== user.password_confirmation){
  //     // todo: needs to go to error parser/builder
  //     cb({error: 'Password does not match password confirmation'})
  //   }

  //   bcrypt.genSalt(16, function(err, salt){
  //     bcrypt.hash(user.password, salt, function(err, hash){
  //       if(err){
  //         cb(err);
  //       }
  //       else {
  //         user.password = hash;
  //         cb();
  //       }
  //     });
  //   });
  // }
  
};

