'use strict'

const SetList = use('App/Model/SetList')
const Spotify = use('App/Services/Spotify')

class SpotifyController {

  * sync (request, response) {
    const setlistId = request.param('id');
    const setlist = yield SetList.find(setlistId);

    const spotify = new Spotify(request.currentUser);
    // In case the user needs to refresh tokens
    spotify.boot();

    const result = yield spotify.createPlaylist(setlist.title);

    setlist.spotify_id = result.id;
    yield setlist.save();

    response.redirect(`/set-lists/${setlist.id}`)
  }

}

module.exports = SpotifyController
