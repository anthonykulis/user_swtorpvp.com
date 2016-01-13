'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table){
    table.bigIncrements();
    table.timestamps();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('password_confirmation').notNullable();
    table.boolean('emails_allowed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
