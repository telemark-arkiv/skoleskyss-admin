'use strict'

module.exports = data => {
  let busskort = ''
  if (data.busskortnummer !== false) {
    busskort = data.busskortnummer.busskortNummer
  } else if (data.busskort && data.busskort.mottattBusskort) {
    busskort = data.busskort.mottattBusskort
  }
  return {
    busskort: busskort
  }
}
