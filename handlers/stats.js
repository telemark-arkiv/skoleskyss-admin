'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const repackStats = require('../lib/repack-stats')
const createViewOptions = require('../lib/create-view-options')
const logger = require('../lib/logger')

module.exports.getStats = async (request, reply) => {
  const yar = request.yar
  const isAdmin = yar.get('isAdmin')
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const urlTotal = `${config.LOGS_SERVICE_URL}/stats/total`
  const urlSchools = `${config.LOGS_SERVICE_URL}/stats/schools`
  if (!isAdmin) {
    reply.redirect('/noaccess')
  } else {
    logger('info', ['stats', 'getStats', 'user', userId])

    axios.defaults.headers.common['Authorization'] = token

    const [total, schools] = await Promise.all([axios.get(urlTotal), axios.get(urlSchools)])

    const stats = repackStats({total: total.data, schools: schools.data})

    const viewOptions = createViewOptions({ credentials: request.auth.credentials, stats: stats })

    reply.view('stats', viewOptions)
  }
}
