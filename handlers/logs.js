'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')

module.exports.getLogPage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const logId = request.params.logID
  const url = `${config.LOGS_SERVICE_URL}/logs/${logId}`

  logger('info', ['logs', 'getLogPage', 'userId', userId, 'logId', logId, 'start'])

  let viewOptions = createViewOptions({credentials: request.auth.credentials})
  axios.defaults.headers.common['Authorization'] = token
  try {
    const results = await axios.get(url)
    viewOptions.logs = results.data
    logger('info', ['logs', 'getLogPage', 'userId', userId, 'logId', logId, 'success'])
  } catch (error) {
    viewOptions.logs = []
    logger('error', ['logs', 'getLogPage', 'userId', userId, 'logId', logId])
  }
  reply.view('log', viewOptions)
}
