'use strict'

const routes = require('./routes')
const auth = require('./routes/auth')
const stats = require('./routes/stats')
const reports = require('./routes/reports')
const search = require('./routes/search')
const systems = require('./routes/systems')

exports.register = (server, options, next) => {
  server.route(routes)
  server.route(auth)
  server.route(stats)
  server.route(reports)
  server.route(search)
  server.route(systems)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
