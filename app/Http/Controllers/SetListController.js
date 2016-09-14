'use strict';

const SetList = use('App/Model/SetList');
const attributes = ['date', 'title'];

class SetListController {

  * index(request, response) {
    const setLists = yield SetList.with('practiceSongs')
      .where({ user_id: request.authUser.id }).fetch();

    yield response.sendView('set-list.index', {setLists: setLists.toJSON()});
  }

  * create(request, response) {
    yield response.sendView('set-list.create');
  }

  * store(request, response) {
    const input = request.only(attributes);
    const setList = yield SetList.create(Object.assign({}, input, { user_id: request.authUser.id }));

    yield request.with({
      success: 'Set List Started'
    }).flash();

    response.redirect(`/set-lists/${setList.id}`)
  }

  * show(request, response) {
    const id = request.param('id');
    try {
      const setList = yield SetList.with('practiceSongs.song').
        where({ id, user_id: request.authUser.id }).firstOrFail()

      yield response.sendView('set-list.show', {setList: setList.toJSON()})
    } catch (e) {
      yield request.with({
        warning: 'We couldn\'t find that set list...'
      }).flash();

      response.redirect(`/set-lists`)
    }
  }

  * update(request, response) {
    const id = request.param('id');
    const input = request.only(attributes);

    try {
      const setList = yield SetList.with('practiceSongs.song').
        where({ id, user_id: request.authUser.id }).firstOrFail()

    } catch (e) {
      yield request.with({
        warning: 'We couldn\'t find that set list...'
      }).flash();

      response.redirect(`/set-lists`)
    }
    setList.fill(input);
    yield setList.save();

    yield response.sendView('set-list.update', {setList: setList.toJSON()});
  }

  * destroy(request, response) {
    const id = request.param('id');

    try {
      const setList = yield SetList.with('practiceSongs.song').
        where({ id, user_id: request.authUser.id }).firstOrFail()

    } catch (e) {
      yield request.with({
        warning: 'We couldn\'t find that set list...'
      }).flash();

      response.redirect(`/set-lists`)
    }

    yield setList.delete();

    yield request.with({
      success: 'Set List Deleted!'
    }).flash();

    response.redirect('back');
  }

}

module.exports = SetListController;
