'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('session', function(table){
    table.increments();
    table.timestamps();
    table.id('user').index().inTable('user').references('id');
    table.string('logged_out');
  });
};

exports.down = function(knex, Promise) {
  
};
