'use strict'

const handlers = require('../handlers/logs')

module.exports = [
  {
    method: 'GET',
    path: '/logs',
    handler: handlers.getLogspage,
    config: {
      description: 'Show the log page'
    }
  }
]
