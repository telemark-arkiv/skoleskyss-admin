'use strict'

module.exports = data => {
  if (data.documentStatus) {
    delete data.documentStatus
  }
  if (data.documentId) {
    delete data.documentId
  }
  if (data.applicantId) {
    delete data.applicantId
  }

  return data
}
