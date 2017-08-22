'use strict'

const fara = require('tfk-saksbehandling-skoleskyss-fara')
const nsb = require('tfk-saksbehandling-skoleskyss-nsb')
const tbr = require('tfk-saksbehandling-skoleskyss-tbr')
const logger = require('./logger')

module.exports = data => {
  let transporters = []
  let isFara = false
  let isFara2 = false
  let isNsb = false
  let isNsb2 = false
  let isTbr = false
  let isTbr2 = false

  if (data.skoleData && data.skoleData.id && data.skoleData.id !== '0000') {
    const skoleid = data.skoleData.id
    if (data.bosted.bosted === 'folkeregistrert' || data.bosted.bosted === 'delt') {
      const options = {
        postnummer: data.dsfData.POSTN,
        skoleid: skoleid,
        gatenavn: data.dsfData.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.dsfData.ADR.replace(/\D/g, '')
      }
      try {
        isFara = fara(options)
      } catch (error) {
        transporters.push('FX')
        logger('error', ['transporter-filter', 'dsf', 'isFara', JSON.stringify(options)])
      }
      try {
        isNsb = nsb(options)
      } catch (error) {
        transporters.push('NX')
        logger('error', ['transporter-filter', 'dsf', 'isNsb', JSON.stringify(options)])
      }
      try {
        isTbr = tbr(options)
      } catch (error) {
        transporters.push('TX')
        logger('error', ['transporter-filter', 'dsf', 'isNsb', JSON.stringify(options)])
      }
    }

    if (data.bosted.bosted === 'hybel') {
      const options = {
        postnummer: data.bostedhybel.POSTN,
        skoleid: skoleid,
        gatenavn: data.bostedhybel.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.bostedhybel.ADR.replace(/\D/g, '')
      }
      try {
        isFara = fara(options)
      } catch (error) {
        transporters.push('FX')
        logger('error', ['transporter-filter', 'hybel', 'isFara', JSON.stringify(options)])
      }
      try {
        isNsb = nsb(options)
      } catch (error) {
        transporters.push('NX')
        logger('error', ['transporter-filter', 'hybel', 'isNsb', JSON.stringify(options)])
      }
      try {
        isTbr = tbr(options)
      } catch (error) {
        transporters.push('TX')
        logger('error', ['transporter-filter', 'hybel', 'isNsb', JSON.stringify(options)])
      }
    }

    if (data.bosted.bosted === 'delt') {
      const options = {
        postnummer: data.dsfDataDelt.POSTN,
        skoleid: skoleid,
        gatenavn: data.dsfDataDelt.ADR.replace(/\d.*/, '').replace(/\s+$/, ''),
        husnummer: data.dsfDataDelt.ADR.replace(/\D/g, '')
      }
      try {
        isFara2 = fara(options)
      } catch (error) {
        transporters.push('FX')
        logger('error', ['transporter-filter', 'delt', 'isFara', JSON.stringify(options)])
      }
      try {
        isNsb2 = nsb(options)
      } catch (error) {
        transporters.push('NX')
        logger('error', ['transporter-filter', 'delt', 'isNsb', JSON.stringify(options)])
      }
      try {
        isTbr2 = tbr(options)
      } catch (error) {
        transporters.push('TX')
        logger('error', ['transporter-filter', 'delt', 'isNsb', JSON.stringify(options)])
      }
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
