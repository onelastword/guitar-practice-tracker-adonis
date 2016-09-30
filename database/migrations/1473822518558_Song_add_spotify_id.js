'use strict'

const Schema = use('Schema')

class SongAddSpotifyIdSchema extends Schema {

  up () {
    this.table('songs', (table) => {
      table.string('spotify_id')
    });
  }

  down () {
    this.table('songs', (table) => {
      table.dropColumn('spotify_id')
    })
  }

}

module.exports = SongAddSpotifyIdSchema
