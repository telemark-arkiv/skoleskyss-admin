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
    street: address.ADR || '',
    city: address.POSTS || '',
    zip: address.POSTN || ''
  }
}

module.exports = data => {
  return {
    applicantId: data.applicantId,
    name: data.dsfData.NAVN,
    school: extractSchool(data),
    status: '',
    address: extractAddress(data),
    address2: extractAddress2(data)
  }
}
