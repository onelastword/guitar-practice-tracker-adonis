'use strict';

const SetList = use('App/Model/SetList');
const attributes = ['date', 'title'];

class SetListController {

  * index(request, response) {
    const setLists = yield SetList.with('practiceSongs').fetch();

    yield response.sendView('set-list.index', {setLists: setLists.toJSON()});
  }

  * create(request, response) {
    yield response.sendView('set-list.create');
  }

  * store(request, response) {
    const input = request.only(attributes);
    const setList = yield SetList.create(Object.assign({}, input, { user_id: request.authUser }));

    yield request.with({
      success: 'Set List Started'
    }).flash();

    response.redirect(`/set-lists/${setList.id}`)
  }

  * show(request, response) {
    const id = request.param('id');
    const setList = yield SetList.with('practiceSongs', 'practiceSongs.song').where({ id }).firstOrFail();

    yield response.sendView('set-list.show', {setList: setList.toJSON()});
  }

  * update(request, response) {
    const id = request.param('id');
    const input = request.only(attributes);

    const setList = yield SetList.with('practiceSongs').where({ id }).firstOrFail();
    setList.fill(input);
    yield setList.save();

    yield response.sendView('set-list.update', {setList: setList.toJSON()});
  }

  * destroy(request, response) {
    const id = request.param('id');

    const setList = yield SetList.query().where({ id }).firstOrFail();
    yield setList.delete();

    yield request.with({
      success: 'Set List Deleted!'
    }).flash();

    response.redirect('back');
  }

}

module.exports = SetListController;
