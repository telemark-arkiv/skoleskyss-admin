'use strict'

function isManuell (item) {
  return /manuell/.test(item.status)
}

function isInnvilget (item) {
  return /innvilget/.test(item.status)
}

function isAvslag (item) {
  return /avslag/.test(item.status)
}

module.exports = data => {
  let status = 'Ubehandlet'

  if (data.documentStatus && Array.isArray(data.documentStatus)) {
    if (data.documentStatus.filter(isManuell).length > 0) {
      status = 'Manuell'
    }
    if (data.documentStatus.filter(isAvslag).length > 0) {
      status = 'Avslag'
    }
    if (data.documentStatus.filter(isInnvilget).length > 0) {
      status = 'Innvilget'
    }
  }

  return status
}
