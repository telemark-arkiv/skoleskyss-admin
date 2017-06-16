'use strict'

const config = require('../config')
const jwt = require('jsonwebtoken')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)
const logger = require('../lib/logger')

module.exports = token => {
  return new Promise((resolve, reject) => {
    if (!token) {
      logger('error', ['verify-signin-jwt', 'token missing'])
      reject(new Error('Missing required signin jwt'))
    } else {
      jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
        if (error) {
          logger('error', ['verify-signin-jwt', JSON.stringify(error)])
          reject(error)
        } else {
          const decrypted = encryptor.decrypt(decoded.data)
          logger('info', ['verify-signin-jwt', 'success'])
          resolve(Object.assign(decrypted))
        }
      })
    }
  })
}
