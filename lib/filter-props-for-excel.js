'use strict'

module.exports = data => {
  if (data.documentStatus) {
    delete data.documentStatus
  }
  if (data.logId) {
    delete data.logId
  }
  if (data.applicantId) {
    delete data.applicantId
  }

  return data
}
