'use strict';

const Schema = use('Schema');

class PracticeSongSchema extends Schema {

  up() {
    this.create('practice_songs', (table) => {
      table.increments();
      table.integer('song_id').references('songs.id');
      table.integer('set_list_id').references('set_lists.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('practice_songs');
  }

}

module.exports = PracticeSongSchema;
