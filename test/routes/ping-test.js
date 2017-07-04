'use strict'

const test = require('ava')
const pingRoutes = require('../../routes/ping')

test('Ping route test', t => {
  t.deepEqual(pingRoutes.length, 1, 'There are 1 ping route')
})
