'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('user', function(table){
    table.increments();
    table.timestamps();
    table.string('email');
    table.string('password');
    table.boolean('emails_allowed');
  })
};

exports.down = function(knex, Promise) {
  
};
