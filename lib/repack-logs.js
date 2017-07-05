'use strict'

function extractSchool (data) {
  let school = ''
  if (data.skoleData) {
    school = data.skoleData.name
  }
  if (data.skoleadresse !== false) {
    school = data.skoleadresse.skoleNavn
  }
  return school
}

function extractAddress (data) {
  let address = {}
  if (['delt', 'folkeregistrert'].includes(data.bosted.bosted)) {
    address = data.dsfData
  } else if (data.bosted.bosted === 'hybel') {
    address = data.bostedhybel
  }
  return {
    street: address.ADR || '',
    city: address.POSTS || '',
    zip: address.POSTN || ''
  }
}

function extractAddress2 (data) {
  let address = {}
  if (['delt'].includes(data.bosted.bosted)) {
    address = data.dsfDataDelt
  }
  return {
    street2: address.ADR || '',
    city2: address.POSTS || '',
    zip2: address.POSTN || ''
  }
}

function extractStatus (data) {
  let status = false
  if (data.isQueued === true) {
    status = [
      {'status': 'Kø', timeStamp: data.skjemaUtfyllingStop}
    ]
  } else {
    status = data.documentStatus
  }
  return {documentStatus: status}
}

module.exports = data => {
  return Object.assign({
    logId: data._id,
    applicantId: data.applicantId,
    name: data.dsfData.NAVN,
    school: extractSchool(data),
    submitted: data.skjemaUtfyllingStop
  }, extractAddress(data), extractAddress2(data), extractStatus(data))
}
