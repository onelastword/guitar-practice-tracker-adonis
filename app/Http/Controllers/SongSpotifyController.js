'use strict'

const Spotify = use('App/Services/Spotify')

class SongSpotifyController {
  * create (request, response) {
    const searchTerm = request.input('search')
    let tracks;

    if (searchTerm) {
      const spotify = new Spotify(request.currentUser)
      // In case the user needs to refresh tokens
      yield spotify.boot()

      const data = yield spotify.search(searchTerm)

      tracks = data.tracks.items;
    }

    yield response.sendView('song-spotify.create', {tracks, searchTerm})
  }

  * store (request, response) {

  }
}

module.exports = SongSpotifyController
