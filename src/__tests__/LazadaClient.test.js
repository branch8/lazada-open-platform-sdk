const LazadaClient = require('src/LazadaClient')
const { VENTURE } = require('src/LazadaClient/constants')

describe('test LazadaClient.js', () => {
  test('test LazadaClient possess `system` action', () => {
    const actions = ['generateAccessToken', 'refreshAccessToken']
    for (let actionName of actions) {
      expect(LazadaClient.hasOwnProperty(actionName)).toBe(true)
    }
  })
})
