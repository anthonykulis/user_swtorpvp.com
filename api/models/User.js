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
        delete obj.password_confirmation;
        return obj;
    }
  },

  beforeUpdate: function(user, cb){

    console.log('beforeUpdate', user);
    // for now, while I do not know what the user model completely
    // looks like, this is good enough

    // no password update
    delete user.password

    // cannot deactivate account here but can be activated here
    if(_.has(user, 'active') && user.active !== true) delete user.active

    // cannot change profiles nor sessions
    delete user.session
    delete user.profile

    // okay, user email cannot exist
    

    console.log('done with beforeUpdate', user);
    cb();
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

