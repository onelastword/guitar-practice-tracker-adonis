'use strict'

const moment = require('moment')
const thunkify = require('thunkify')
const request = require('request')
const Env = use('Env')

const post = thunkify(request.post)
const get = thunkify(request.get)

class ProfileController {
  * edit (request, response) {
    const spotifyCode = request.input('code')

    const secret = Env.get('SPOTIFY_SECRET')
    const clientId = Env.get('SPOTIFY_CLIENT_ID')
    const redirect = Env.get('SPOTIFY_REDIRECT_URL')

    if (spotifyCode) {
      const auth = `${clientId}:${secret}`;

      const form = {
        grant_type: 'authorization_code',
        code: spotifyCode,
        redirect_uri: redirect,
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

      const [{ body: { id: spotify_id } }] = yield get('https://api.spotify.com/v1/me', {
        auth: {
          bearer: socialData.access_token,
        },
        json: true,
      });

      request.authUser.fill({
        expire_time: expire_time.toDate(),
        access_token: socialData.access_token,
        refresh_token: socialData.refresh_token,
        spotify_id,
      })

      yield request.authUser.save()

      yield request.with({
        success: 'Spotify login added!',
      }).flash()

      return response.redirect('/profile')
    }
    const scopes = 'playlist-modify-private playlist-modify-public'
    const spotifyUrl = `https://accounts.spotify.com/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirect)}` +
      `&scope=${encodeURIComponent(scopes)}`
    yield response.sendView('profile.edit', { spotifyUrl })
  }
}

module.exports = ProfileController
