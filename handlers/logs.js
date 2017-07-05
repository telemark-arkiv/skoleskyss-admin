'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')
const repackLogs = require('../lib/repack-logs')

module.exports.getLogspage = async (request, reply) => {
  const yar = request.yar
  const isAdmin = yar.get('isAdmin')
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const documentId = request.query.documentId
  const applicantId = request.query.applicantId
  if (!isAdmin) {
    reply.redirect('/noaccess')
  } else {
    let logs = []
    axios.defaults.headers.common['Authorization'] = token
    try {
      if (applicantId) {
        const url = `${config.LOGS_SERVICE_URL}/logs/search`
        const payload = {
          applicantId: applicantId
        }
        logger('info', ['index', 'getLogspage', 'userId', userId, 'applicantId', applicantId, 'start'])
        const results = await axios.post(url, payload)
        logs = results.data
        logger('info', ['index', 'getLogspage', 'userId', userId, 'logs ok', logs.length])
      } else {
        const url = `${config.LOGS_SERVICE_URL}/logs/${documentId}`
        logger('info', ['index', 'getLogspage', 'userId', userId, 'documentId', documentId, 'start'])
        const results = await axios.get(url)
        logs = results.data
        logger('info', ['index', 'getLogspage', 'userId', userId, 'logs ok', logs.length])
      }
    } catch (error) {
      if (applicantId) {
        logger('error', ['index', 'getLogspage', 'userId', userId, 'applicantId', applicantId, error])
      } else {
        logger('error', ['index', 'getLogspage', 'userId', userId, 'documentId', documentId, error])
      }
    }
    let viewOptions = createViewOptions({ credentials: request.auth.credentials, logs: logs.map(repackLogs) })
    reply.view('log', viewOptions)
  }
}
