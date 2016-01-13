'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('sessions', function(table){
    table.bigIncrements();
    table.timestamps();
    table.bigInteger('user_id').index().inTable('user').references('id');
    table.boolean('logged_in');
  });  
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('session');  
};
