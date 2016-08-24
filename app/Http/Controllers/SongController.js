'use strict';

const Song = use('App/Model/Song');

const rules = {
  title: 'required',
  artist: 'required',
  spotify_link: 'required',
}

class SongController {

  * index(request, response) {
    const songs = yield Song.with().fetch();

    response.send(songs);
  }

  * store(request, response) {
    const input = request.only('title', 'artist', 'spotify_link');

    const validation = yield Validator.validate(input, rules)

    if (validation.fails()) {
      yield request.withAll()
        .andWith({
          errors: validation.messages(),
          warning: 'Error submitting song!'
        })
        .flash()

      return response.redirect('back')
    }

    const song = yield Song.create(input);

    response.send(song);
  }

  * show(request, response) {
    const id = request.param('id');
    const song = yield Song.with().where({ id }).firstOrFail();

    response.send(song);
  }

  * update(request, response) {
    const input = request.only('title', 'artist', 'spotify_link');
    const id = request.param('id');

    const validation = yield Validator.validate(input, rules)

    if (validation.fails()) {
      yield request.withAll()
        .andWith({
          errors: validation.messages(),
          warning: 'Error updating song!'
        })
        .flash()

      return response.redirect('back')
    }

    const song = yield Song.with().where({ id }).firstOrFail();
    song.fill(input);
    yield song.save(input);

    response.send(song);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const song = yield Song.query().where({ id }).firstOrFail();
    yield song.delete();

    response.status(204).send();
  }

}

module.exports = SongController;
