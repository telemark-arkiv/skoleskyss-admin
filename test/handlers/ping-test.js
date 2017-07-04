'use strict'

const test = require('ava')
const pingHandlers = require('../../handlers/ping')

test('Ping handler tests', t => {
  t.deepEqual(Object.keys(pingHandlers).length, 1, 'There are 1 ping handler')
  t.truthy(pingHandlers.ping, 'Handler has method ping')
})
