'use strict'

const Schema = use('Schema')
const Database = use('Database')

class SongUpdateSpotifyIdValueSchema extends Schema {

  up () {
    return Database.table('songs').select()
      .then((songs) => {
        return Promise.all(songs.map((song) => {
          const spotify_id = song.spotify_link.replace('https://open.spotify.com/track/', '');

          return Database.table('songs').where({id: song.id}).update({spotify_id});
        }));
      });
  }

  down () {

  }

}

module.exports = SongUpdateSpotifyIdValueSchema
