'use strict'

const Schema = use('Schema')

class UserAddSocialSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('access_token')
      table.date('expire_time')
      table.string('refresh_token')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('access_token')
      table.dropColumn('expire_time')
      table.dropColumn('refresh_token')
    })
  }

}

module.exports = UserAddSocialSchema
