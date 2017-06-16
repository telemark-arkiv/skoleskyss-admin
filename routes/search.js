'use strict'

const handlers = require('../handlers/search')

module.exports = [
  {
    method: 'POST',
    path: '/search',
    handler: handlers.doSearch,
    config: {
      description: 'Search'
    }
  }
]
