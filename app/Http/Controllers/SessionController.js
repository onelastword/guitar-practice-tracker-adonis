'use strict'

class SessionController {

  * create(request, response) {
    yield response.sendView('session.create')
  }

  * store(request, response) {
    const {email, password} = request.all()
    try {
      yield request.auth.attempt(email, password)
    } catch (e) {
      yield request
        .withOut('password')
        .andWith({
          warning: 'Email and password do not match!'
        }).flash()

      return response.redirect('back')
    }

    yield request
      .with({
        success: 'You have logged in!'
      }).flash()

      response.redirect(yield request.session.pull('auth-back', '/songs'))
  }

  * destroy (request, response) {
    yield request.auth.logout();

    yield request
      .with({
        success: 'You have been logged out!'
      }).flash()

    response.redirect('/login')
  }

}

module.exports = SessionController
