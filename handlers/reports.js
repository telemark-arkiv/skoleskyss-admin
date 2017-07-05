'use strict'

const axios = require('axios')
const uuid = require('uuid')
const os = require('os')
const fs = require('fs')
const config = require('../config')
const generateSystemJwt = require('../lib/generate-system-jwt')
const createViewOptions = require('../lib/create-view-options')
const datePadding = require('../lib/date-padding')
const timestampMe = require('../lib/timestamp-me')
const logger = require('../lib/logger')
const repackLogs = require('../lib/repack-logs')
const generateExcelFile = require('../lib/generate-excel-file')

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
  const report = results.data.map(repackLogs())
  const uniqueName = `${uuid.v4()}.xlsx`
  const filename = `${os.tmpdir()}/${uniqueName}`

  await generateExcelFile({filename: filename, data: report})
  const excel = fs.readFileSync(filename)

  reply(excel)
    .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    .header('Content-Disposition', 'attachment; filename=' + uniqueName)
    .on('finish', () => {
      logger('info', ['reports', 'generateApplicationsReport', 'user', userId, `${request.payload.fromDate} - ${request.payload.toDate}`, uniqueName, 'success'])
      try {
        fs.unlinkSync(filename)
        logger('info', ['reports', 'generateApplicationsReport', 'user', userId, `${request.payload.fromDate} - ${request.payload.toDate}`, uniqueName, 'cleanup finished'])
      } catch (error) {
        logger('error', ['reports', 'generateApplicationsReport', 'user', userId, `${request.payload.fromDate} - ${request.payload.toDate}`, 'unlink', error])
      }
    })
}

module.exports.getReportFrontpage = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const now = new Date()
  const today = `${now.getFullYear()}-${datePadding(now.getMonth() + 1)}-${datePadding(now.getDate())}`
  logger('info', ['reports', 'getReportFrontpage', 'user', userId])
  const viewOptions = createViewOptions({credentials: request.auth.credentials, today: today})

  reply.view('reports', viewOptions)
}
