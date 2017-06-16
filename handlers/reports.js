'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const datePadding = require('../lib/date-padding')
const timestampMe = require('../lib/timestamp-me')
const logger = require('../lib/logger')

module.exports.generateApplicationsReport = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const token = generateSystemJwt(userId)
  const url = `${config.LOGS_SERVICE_URL}/logs/search`
  const fromDate = timestampMe(`${request.payload.fromDate} 00:00:01`)
  const toDate = timestampMe(`${request.payload.toDate} 23:59:59`)
  const mongoQuery = {
    timeStamp: {
      $gte: parseInt(fromDate),
      $lte: parseInt(toDate)
    }
  }

  axios.defaults.headers.common['Authorization'] = token

  logger('info', ['reports', 'generateApplicationsReport', 'user', userId, `${request.payload.fromDate} - ${request.payload.toDate}`])
  const results = await axios.post(url, mongoQuery)

  reply(results.data)

  /*
  const viewOptions = createViewOptions({credentials: request.auth.credentials, myContactClasses: myContactClasses, report: report, classId: classId})

  reply.view('report-class-warnings', viewOptions)
  */
}

module.exports.getReportFrontpage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const now = new Date()
  const today = `${now.getFullYear()}-${datePadding(now.getMonth() + 1)}-${datePadding(now.getDate())}`
  logger('info', ['reports', 'getReportFrontpage', 'user', userId])
  const viewOptions = createViewOptions({credentials: request.auth.credentials, today: today})

  reply.view('reports', viewOptions)
}
