'use strict';

exports.up = function(knex, Promise) {
  // knex.schema.createTable('user', function(table){
  //   table.bigIncrements();
  //   table.timestamps();
  //   table.string('email');
  //   table.string('password');
  //   table.boolean('emails_allowed');
  // });

  knex.schema.createTable('session', function(table){
    table.bigIncrements();
    table.timestamps();
    // table.bigInteger('user_id').index().inTable('user').references('id');
    table.boolean('logged_in');
  });  
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('session'); 
  knex.schema.dropTable('user');
};
