'use strict';

const Schema = use('Schema');

class SongSchema extends Schema {

  up() {
    this.create('songs', (table) => {
      table.increments();
      table.string('title');
      table.string('artist');
      table.string('spotify_link');
      table.timestamps();
    });
  }

  down() {
    this.drop('songs');
  }

}

module.exports = SongSchema;
