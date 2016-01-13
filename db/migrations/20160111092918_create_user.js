'use strict';

exports.up = function(knex, Promise) {
  knex.schema('public').createTable('user', function(table){
    table.bigIncrements();
    table.timestamps();
    table.string('email');
    table.string('password');
    table.boolean('emails_allowed');
  });
};

exports.down = function(knex, Promise) {
  
};
