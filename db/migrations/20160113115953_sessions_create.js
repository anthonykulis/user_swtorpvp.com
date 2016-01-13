'use strict';

exports.up = function(knex, Promise) {
  console.log('starting create of session table');
  knex.schema.createTable('session', function(table){
    console.log('in table');
    table.increments();
    table.timestamps();
    table.integer('user').index().inTable('user').references('id');
    table.boolean('logged_out');
  });  
};

exports.down = function(knex, Promise) {
  
};
