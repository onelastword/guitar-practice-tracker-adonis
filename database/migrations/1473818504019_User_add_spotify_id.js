'use strict'

const Schema = use('Schema')

class UserAddSpotifyIdSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('spotify_id')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('spotify_id')
    })
  }

}

module.exports = UserAddSpotifyIdSchema
