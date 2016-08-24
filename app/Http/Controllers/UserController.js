'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

const createRules = {
  username: 'required|unique:users',
  email: 'required|email|unique:users',
  password: 'required|confirmed',
}

class UserController {

  * create(request, response) {
    yield response.sendView('user.create')
  }

  * store(request, response) {
    const { email, password, username, password_confirmation } = request.all()

    const validation = yield Validator.validate({ email, password, username, password_confirmation }, createRules)

    if (validation.fails()) {
      yield request.withAll()
        .andWith({
          errors: validation.messages(),
          warning: 'Error creating user!'
        })
        .flash()

      return response.redirect('back')
    }

    const user = yield User.create({ email, username, password: yield Hash.make(password) })

    yield request.auth.login(user)
    yield request.with({ success: 'User created!' }).flash()

    response.redirect('/app')
  }

  * destroy (request, response) {
    yield request.auth.logout()

    yield request.with({
      success: 'User logged out!'
    }).flash()

    response.redirect('login')
  }

}

module.exports = UserController
