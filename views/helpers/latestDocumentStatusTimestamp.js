'use strict'

const formatDate = require('./formatDate')

module.exports = function (statuses) {
  const latest = statuses ? statuses[statuses.length - 1] : false
  if (latest) {
    return formatDate(latest.timeStamp)
  } else {
    return ''
  }
}
