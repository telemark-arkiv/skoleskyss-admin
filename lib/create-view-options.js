'use strict'

const pkg = require('../package.json')

module.exports = options => {
  const baseOptions = {
    version: pkg.version,
    systemName: pkg.name,
    githubUrl: pkg.repository.url
  }

  return options ? Object.assign(baseOptions, options) : baseOptions
}
