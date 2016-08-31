'use strict'

const moment = require('moment')
const thunkify = require('thunkify')
const request = require('request')
const Env = use('Env')

const post = thunkify(request.post)

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

      console.log(socialData)

      const expire_time = moment().add(socialData.expires_in, 'seconds')

      request.authUser.fill({
        expire_time: expire_time.toDate(),
        access_token: socialData.access_token,
        refresh_token: socialData.refresh_token,
      })

      yield request.authUser.save()

      yield request.with({
        success: 'Spotify login added!',
      }).flash()
    }

    const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=` +
      `${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(redirect)}`
    yield response.sendView('profile.edit', {spotifyUrl})
  }
}

module.exports = ProfileController
