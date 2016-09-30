'use strict'

const moment = require('moment')
const thunkify = require('thunkify')
const request = require('request')
const get = thunkify(request.get)
const post = thunkify(request.post)

const Env = use('Env')

const secret = Env.get('SPOTIFY_SECRET')
const clientId = Env.get('SPOTIFY_CLIENT_ID')
const redirect = Env.get('SPOTIFY_REDIRECT_URL')

class Spotify {
  constructor(user) {
    this.user = user
  }

  * boot() {
    if (this.user.expire_time < Date.now()) {
      yield this.refreshAccessToken(this.user.refresh_token)
      console.log('Please refresh token')
    }
  }

  * refreshAccessToken(refreshToken) {
    const form = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    const [{body: socialData}] = yield post('https://accounts.spotify.com/api/token', {
      auth: {
        user: clientId,
        pass: secret,
      },
      form,
      json: true
    });

    const expire_time = moment().add(socialData.expires_in, 'seconds');

    this.user.fill({
      expire_time: expire_time.toDate(),
      access_token: socialData.access_token,
      refresh_token: socialData.refresh_token,
    })

    yield this.user.save()
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

  * syncPlaylistSongs(playlistId, songIds) {
    console.log(songIds)
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
