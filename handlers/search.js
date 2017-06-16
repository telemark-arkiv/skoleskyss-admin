'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')

module.exports.doSearch = async (request, reply) => {
  const data = request.payload
  const searchText = data.searchText
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const url = `${config.LOGS_SERVICE_URL}/logs/search`
  const mongoQuery = {
    '$text': {
      '$search': searchText
    }
  }

  logger('info', ['index', 'doSearch', 'userId', userId, 'searchText', searchText, 'start'])

  let viewOptions = createViewOptions({ credentials: request.auth.credentials, searchText: searchText })

  axios.defaults.headers.common['Authorization'] = token

  try {
    const results = await axios.post(url, mongoQuery)
    viewOptions.logs = results.data
    logger('info', ['index', 'doSearch', 'userId', userId, 'got results', viewOptions.logs.length, 'success'])
  } catch (error) {
    viewOptions.logs = []
    logger('error', ['index', 'doSearch', 'userId', userId, 'searchText', searchText, error])
  }

  reply.view('search', viewOptions)
}
