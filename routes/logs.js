'use strict'

const handlers = require('../handlers/logs')

module.exports = [
  {
    method: 'GET',
    path: '/logs/{logID}',
    handler: handlers.getLogPage,
    config: {
      description: 'Show the log page'
    }
  }
]
