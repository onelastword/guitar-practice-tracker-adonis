'use strict'

const moment = require('moment')
const thunkify = require('thunkify')
const request = require('request')
const get = thunkify(request.get)
const post = thunkify(request.post)

class Spotify {
  constructor(user) {
    this.user = user
  }

  * boot() {

  }

  * createPlaylist(playlistName) {
    const username = this.user.spotify_id;

    const [{body}] = yield post(`https://api.spotify.com/v1/users/${username}/playlists`, {
      body: {
        name: playlistName,
        public: false
      },

      auth: {
        bearer: this.user.access_token,
      },

      json: true,
    });

    return body;
  }

  * search(term, page = 1) {
    const [{body}] = yield get({
      url: `https://api.spotify.com/v1/search?q=${term}&page=${page}&type=track`,
      headers: {
        Accept: 'application/json',
      },
      json: true,
    })

    return body
  }
}

module.exports = Spotify
