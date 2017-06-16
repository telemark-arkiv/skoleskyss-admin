'use strict'

const config = require('../config')
const verifySigninJwt = require('../lib/verify-signin-jwt')
const logger = require('../lib/logger')

module.exports.doSignIn = async (request, reply) => {
  const token = request.query.jwt
  const nextPath = request.query.nextPath
  try {
    const user = await verifySigninJwt(token)

    logger('info', ['auth', 'doSignIn', 'verified', user.userId])

    request.cookieAuth.set({data: user, token: token})

    if (nextPath && nextPath.length > 0) {
      reply.redirect(nextPath)
    } else {
      reply.redirect('/')
    }
  } catch (error) {
    logger('error', ['auth', 'doSignIn', error])
    reply(error)
  }
}

module.exports.doSignOut = (request, reply) => {
  const userId = request.auth.credentials.data.userId
  logger('info', ['auth', 'doSignOut', userId])
  request.cookieAuth.clear()
  reply.redirect(`${config.AUTH_SERVICE_URL}/logout`)
}
