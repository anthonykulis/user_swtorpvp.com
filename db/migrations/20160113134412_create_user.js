'use strict';

exports.up = function(knex, Promise) {
  knex.schema.createTable('user', function(table){
    table.bigIncrements();
    table.timestamps();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.boolean('emails_allowed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('user');
};
