'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')
const repackLogs = require('../lib/repack-logs')

module.exports.getFrontpage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const url = `${config.LOGS_SERVICE_URL}/logs/latest`

  logger('info', ['index', 'getFrontpage', 'userId', userId, 'start'])

  let viewOptions = createViewOptions({credentials: request.auth.credentials})

  axios.defaults.headers.common['Authorization'] = token
  axios.get(url).then(results => {
    const logs = results.data || []
    viewOptions.logs = logs.map(repackLogs)
    logger('info', ['index', 'getFrontpage', 'userId', userId, 'got logs', viewOptions.logs.length])
    reply.view('index', viewOptions)
  }).catch(error => {
    logger('error', ['index', 'getFrontpage', 'userId', userId, error])
    viewOptions.logs = []
    reply.view('index', viewOptions)
  })
}
