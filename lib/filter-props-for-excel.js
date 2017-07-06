'use strict'

module.exports = data => {
  if (data.documentStatus) {
    delete data.documentStatus
  }

  return data
}
