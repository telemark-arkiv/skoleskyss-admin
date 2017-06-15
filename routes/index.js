'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.getFrontpage,
    config: {
      description: 'Show the frontpage'
    }
  },
  {
    method: 'GET',
    path: '/logs',
    handler: handlers.getLogspage,
    config: {
      description: 'Show the logspage'
    }
  },
  {
    method: 'POST',
    path: '/search',
    handler: handlers.doSearch,
    config: {
      description: 'Search'
    }
  },
  {
    method: 'GET',
    path: '/ping',
    handler: (request, reply) => reply('pong'),
    config: {
      description: 'Ping',
      auth: false
    }
  }
]
