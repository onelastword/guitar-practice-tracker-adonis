'use strict';

const Schema = use('Schema');

class SetListSchema extends Schema {

  up() {
    this.create('set_lists', (table) => {
      table.increments();
      table.date('date');
      table.string('title');
      table.integer('user_id').references('users.id');
      
      table.timestamps();
    });
  }

  down() {
    this.drop('set_lists');
  }

}

module.exports = SetListSchema;
