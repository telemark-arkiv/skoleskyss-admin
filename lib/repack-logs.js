'use strict'

const fixFullName = require('./fix-full-name')
const transporterFilter = require('./transporter-filter')
const calculateStatus = require('./calculate-status')

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
  let address = data.dsfData
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
  if (['hybel'].includes(data.bosted.bosted)) {
    address = data.bostedhybel
  }
  return {
    street2: address.ADR || '',
    city2: address.POSTS || '',
    zip2: address.POSTN || ''
  }
}

function addDocumentStatus (data) {
  const status = {'status': 'Kø', timeStamp: data.skjemaUtfyllingStop}
  const documentStatus = data.documentStatus || []
  documentStatus.unshift(status)
  return {documentStatus: documentStatus}
}

module.exports = data => {
  return Object.assign({
    logId: data._id,
    applicantId: data.applicantId,
    name: fixFullName(data.dsfData),
    fodt: data.dsfData.FODT,
    email: data.korData.Email || '',
    phone: data.korData.MobilePhone || '',
    busskort: data.busskortnummer !== false ? data.busskortnummer.busskortNummer : '',
    school: extractSchool(data),
    submitted: data.skjemaUtfyllingStop,
    transporters: transporterFilter(data),
    status: calculateStatus(data)
  }, extractAddress(data), extractAddress2(data), addDocumentStatus(data))
}
