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
      type: 'string'
    },
    password: {
      required: true,
      type: 'string',
      minLength: 8
    },
    emails_allowed: {
      type: 'boolean',
      defaultsTo: false
    },

    // sessions: {
    //   collection: 'session',
    //   via: 'user'
    // },
    // toJSON: function() {
    //     var obj = this.toObject();
    //     delete obj.password;
    //     return obj;
    // }
  },
  beforeCreate: function(user, cb) {

    console.log('before create', user);
    if(user.password !== user.password_confirmation){
      // todo: needs to go to error parser/builder
      error = {
        error: 'E_VALIDATION',
        status: 400,
        summary: '1 attribute is invalid',
        invalidAttributes: {
          password_confirmation: [{
            message: "Password confirmation doesn't match password"
          }]
        }
      };
      cb(error);

    }

    delete user.password_confirmation;
    
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
  
};

