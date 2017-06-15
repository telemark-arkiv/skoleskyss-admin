'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')

module.exports.getFrontpage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const url = `${config.LOGS_SERVICE_URL}/logs/latest`
  let mongoQuery = {'userId': userId}

  logger('info', ['index', 'getFrontpage', 'userId', userId, 'start'])

  let viewOptions = createViewOptions({credentials: request.auth.credentials})

  axios.defaults.headers.common['Authorization'] = token
  axios.get(url).then(results => {
    viewOptions.logs = results.data || []
    logger('info', ['index', 'getFrontpage', 'userId', userId, 'got logs', viewOptions.logs.length])
    reply.view('index', viewOptions)
  }).catch(error => {
    logger('error', ['index', 'getFrontpage', 'userId', userId, JSON.stringify(error)])
    viewOptions.logs = []
    reply.view('index', viewOptions)
  })
}

module.exports.getLogspage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const documentId = request.query.documentId
  const url = `${config.LOGS_SERVICE_URL}/logs/${documentId}`

  logger('info', ['index', 'getLogspage', 'userId', userId, 'start'])

  axios.defaults.headers.common['Authorization'] = token
  const results = await axios.get(url)

  let viewOptions = createViewOptions({ credentials: request.auth.credentials, logs: results.data })

  logger('info', ['index', 'getLogspage', 'userId', userId, 'single log ok'])
  reply.view('logs-detailed', viewOptions)
}

module.exports.doSearch = async (request, reply) => {
  const data = request.payload
  const searchText = data.searchText
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const url = `${config.LOGS_SERVICE_URL}/logs/search`
  const mongoQuery = {
    searchText: searchText
  }

  logger('info', ['index', 'doSearch', 'userId', userId, 'searchText', searchText, 'start'])

  let viewOptions = createViewOptions({ credentials: request.auth.credentials, searchText: searchText })

  axios.defaults.headers.common['Authorization'] = token
  const results = await axios.post(url, mongoQuery)
  const payload = results.data

  viewOptions.students = payload
  logger('info', ['index', 'doSearch', 'userId', userId, 'searchText', searchText, 'success', payload.length, 'hits'])
  reply.view('search-results', viewOptions)
}
