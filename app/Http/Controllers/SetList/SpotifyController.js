'use strict'

const SetList = use('App/Model/SetList')
const Spotify = use('App/Services/Spotify')

class SpotifyController {

  * sync (request, response) {
    const setlistId = request.param('id');
    const setlist = yield SetList.find(setlistId);

    const spotify = new Spotify(request.currentUser);
    // In case the user needs to refresh tokens
    yield spotify.boot();

    if (!setlist.spotify_id) {
      const result = yield spotify.createPlaylist(setlist.title);

      setlist.spotify_id = result.id;
      yield setlist.save();
    }

    const songs = yield setlist.practiceSongs().with('song').fetch();
    const songIds = songs.map((practiceSong) => practiceSong.toJSON().song.spotify_id)
      .value()
    yield spotify.syncPlaylistSongs(setlist.spotify_id, songIds)

    response.redirect(`/set-lists/${setlist.id}`)
  }

}

module.exports = SpotifyController
