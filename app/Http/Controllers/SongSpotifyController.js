'use strict';

const Spotify = use('App/Services/Spotify');

class SongSpotifyController {
  * create(request, response) {
    if (request.ajax()) {
      return yield this.getApi(request, response);
    }

    yield response.sendView('song-spotify.create');
  }

  * getApi(request, response) {
    const searchTerm = request.input('search');
    let tracks;

    if (searchTerm) {
      const spotify = new Spotify(request.currentUser);
      // In case the user needs to refresh tokens
      yield spotify.boot();

      const data = yield spotify.search(searchTerm);

      tracks = data.tracks.items;
    }

    response.send({ tracks });
  }
}

module.exports = SongSpotifyController;
