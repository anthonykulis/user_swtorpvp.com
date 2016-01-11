'use strict';

exports.up = function(knex, Promise) {
    knex.schema.dropTable('user');
};

exports.down = function(knex, Promise) {
  
};
