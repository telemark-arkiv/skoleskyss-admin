'use strict'

const fara = require('tfk-saksbehandling-skoleskyss-fara')
const nsb = require('tfk-saksbehandling-skoleskyss-nsb')
const tbr = require('tfk-saksbehandling-skoleskyss-tbr')

module.exports = data => {
  let transporters = []
  let isFara = false
  let isFara2 = false
  let isNsb = false
  let isNsb2 = false
  let isTbr = false
  let isTbr2 = false

  if (data.skoleData && data.skoleData.id !== '0000') {
    const skoleid = data.skoleData.id
    if (data.bosted.bosted === 'folkeregistrert' || data.bosted.bosted === 'delt') {
      const options = {
        postnummer: data.dsfData.POSTN,
        skoleid: skoleid,
        gatenavn: data.dsfData.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.dsfData.ADR.replace(/\D/g, '')
      }
      isFara = fara(options)
      isNsb = nsb(options)
      isTbr = tbr(options)
    }

    if (data.bosted.bosted === 'hybel') {
      const options = {
        postnummer: data.bostedhybel.POSTN,
        skoleid: skoleid,
        gatenavn: data.bostedhybel.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.bostedhybel.ADR.replace(/\D/g, '')
      }
      isFara = fara(options)
      isNsb = nsb(options)
      isTbr = tbr(options)
    }

    if (data.bosted.bosted === 'delt') {
      const options = {
        postnummer: data.dsfDataDelt.POSTN,
        skoleid: skoleid,
        gatenavn: data.dsfDataDelt.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.dsfDataDelt.ADR.replace(/\D/g, '')
      }
      isFara2 = fara(options)
      isNsb2 = nsb(options)
      isTbr2 = tbr(options)
    }

    if (isFara === true || isFara2 === true) {
      transporters.push('F')
    }
    if (isNsb === true || isNsb2 === true) {
      transporters.push('N')
    }
    if (isTbr === true || isTbr2 === true) {
      transporters.push('T')
    }
  }

  return transporters.join('')
}
