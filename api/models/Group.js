/**
* Groups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports = {

  attributes: {
    text: {
      required: true,
      type: 'string'
    },
    description: {
      required: true,
      type: 'text'
    },
    roles: {
      collection: 'role',
      via: 'groups'
    },
    users: {
      collection: 'user',
      via: 'groups'
    }
  },


};

