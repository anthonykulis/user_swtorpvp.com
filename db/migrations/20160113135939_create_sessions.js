'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', function(table){
    table.bigIncrements();
    table.timestamps();
    table.bigInteger('user').references('id').inTable('user');
    table.boolean('active').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session');
};
