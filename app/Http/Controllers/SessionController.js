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
        warning: 'Email and password do not match!'
      }).flash()

    response.redirect('/songs')
  }

}

module.exports = SessionController
