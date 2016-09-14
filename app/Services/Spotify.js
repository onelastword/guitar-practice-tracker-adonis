'use strict'

const moment = require('moment')
const thunkify = require('thunkify')
const request = require('request')
const get = thunkify(request.get)

class Spotify {
  constructor(user) {
    this.user = user
  }

  * boot() {

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
