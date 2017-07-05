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
    path: '/noaccess',
    handler: handlers.showNoAccess,
    config: {
      description: 'Show the no access page'
    }
  }
]
