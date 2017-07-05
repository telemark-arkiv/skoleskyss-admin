'use strict'

const capitalize = require('capitalize')

module.exports = item => {
  let name = [capitalize.words(item['NAVN-F'].toLowerCase())]

  if (item['NAVN-M'] && item['NAVN-M'] !== '') {
    name.push(capitalize.words(item['NAVN-M'].toLowerCase()))
  }

  name.push(capitalize.words(item['NAVN-S'].toLowerCase()))

  return name.join(' ')
}
