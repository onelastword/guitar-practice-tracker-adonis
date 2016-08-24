'use strict'

const Lucid = use('Lucid')

class SetList extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
  practiceSongs() {
    return this.hasMany('App/Model/PracticeSong', 'id', 'set_list_id');
  }
}

module.exports = SetList
