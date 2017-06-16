'use strict'

module.exports = data => {
  return data.map(line => Object.assign({
    name: line.fullName,
    school: line.schoolName
  }))
}
