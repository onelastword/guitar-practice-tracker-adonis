'use strict'

const Lucid = use('Lucid')

class PracticeSong extends Lucid {


  song() {
    return this.belongsTo('App/Model/Song', 'id', 'song_id');
  }
  setList() {
    return this.belongsTo('App/Model/SetList', 'id', 'set_list_id');
  }
}

module.exports = PracticeSong
