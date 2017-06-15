'use strict'

const handlers = require('../handlers/reports')

module.exports = [
  {
    method: 'POST',
    path: '/reports/applications',
    handler: handlers.generateApplicationsReport,
    config: {
      description: 'Reports for applications'
    }
  },
  {
    method: 'GET',
    path: '/reports',
    handler: handlers.getReportFrontpage,
    config: {
      description: 'Frontpage for reports'
    }
  }
]
