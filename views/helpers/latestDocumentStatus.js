'use strict'

module.exports = statuses => {
  const latest = statuses ? statuses[statuses.length - 1] : false
  return latest ? latest.status : ''
}
