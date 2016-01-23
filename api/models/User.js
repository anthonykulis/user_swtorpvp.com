/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  uniqueEmail: false,

  types: {
    uniqueEmail: function(value){
      return uniqueEmail;
    }
  },

  attributes: {
    email: {
      unique: true,
      required: true,
      type: 'string',
      email: 'true',
      uniqueEmail: true
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
    active: {
      type: 'boolean',
      defaultsTo: true
    },
    session: {
      model: 'session'
    },
    profile: {
      model: 'profile'
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
  },

  beforeUpdate: function(user, cb){
    console.log('bv on user called');
    // no password update if not current user is user passed
    if(user.password && user.password_confirmation && user.password === user.password_confirmation)
      return this.beforeCreate(user, cb);

    // cannot deactivate account here but can be activated here
    if(_.has(user, 'active') && user.active !== true) delete user.active

    cb();
  },

  beforeValidate: function(user, cb){

    User.findOne({email: user.email}).exec(function(err, rec){
      uniqueEmail = !(err || rec);
      cb();
    });
  },

  beforeCreate: function(user, cb) {

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

