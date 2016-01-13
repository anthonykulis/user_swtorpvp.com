'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('session', function(table){
    table.increments();
    table.timestamps();
    table.bigInteger('user').index().inTable('user').references('id');
    table.boolean('logged_out');
  });  
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('session');  
};
