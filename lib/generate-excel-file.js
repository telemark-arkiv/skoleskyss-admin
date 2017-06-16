'use strict'

const xlsx = require('tfk-json-to-xlsx')
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    xlsx.write(options.filename, options.data, error => {
      if (error) {
        logger('error', ['reports', 'generate-excel-file', error])
        reject(error)
      } else {
        logger('info', ['reports', 'generate-exel-file', 'file generated'])
        resolve(true)
      }
    })
  })
}
