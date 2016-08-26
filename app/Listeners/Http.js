'use strict'

const Env = use('Env')
const Ouch = use('youch')
const Http = exports = module.exports = {}

const { InvalidLoginException } = require('adonis-auth/src/Exceptions')

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {

  if (error instanceof InvalidLoginException) {
    yield request
      .with({
        warning: 'You must be logged in to see this route!'
      }).flash()

    yield request.session.put('auth-back', request.originalUrl())

    return response.redirect('/login')
  }

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const ouch = new Ouch().pushHandler(
      new Ouch.handlers.PrettyPageHandler('blue', null, 'sublime')
    )
    ouch.handleException(error, request.request, response.response, (output) => {
      console.error(error.stack)
    })
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  const status = error.status || 500
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
}
