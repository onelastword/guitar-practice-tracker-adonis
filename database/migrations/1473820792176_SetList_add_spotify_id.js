'use strict'

const Schema = use('Schema')

class SetListAddSpotifyIdSchema extends Schema {

  up () {
    this.table('set_lists', (table) => {
      table.string('spotify_id')
    })
  }

  down () {
    this.table('set_lists', (table) => {
      table.dropColumn('spotify_id')
    })
  }

}

module.exports = SetListAddSpotifyIdSchema
