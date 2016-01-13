'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', function(table){
    table.bigIncrements();
    table.timestamps();
    table.bigInteger('user').inTable('user').references('id');
    table.boolean('active').defaultTo(trye);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
