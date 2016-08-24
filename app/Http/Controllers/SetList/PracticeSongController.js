'use strict'

const Song = use('App/Model/Song')
const PracticeSong = use('App/Model/PracticeSong')

class PracticeSongController {

  * create(request, response) {
    const id = request.param('id')
    const songs = yield Song.all()
    const songOptions = songs.toJSON().reduce((snowball, curr) => {
      snowball[curr.id] = curr.title;

      return snowball;
    }, {})

    yield response.sendView('set-list.practice-song.create', { songOptions, id })
  }

  * store(request, response) {
    const set_list_id = request.param('id')
    const song_id = request.input('song_id')
    yield PracticeSong.create({song_id, set_list_id})

    yield request.with({
      success: 'Song added to set list!'
    }).flash()
    response.redirect(`/set-lists/${set_list_id}`)
  }

}

module.exports = PracticeSongController
