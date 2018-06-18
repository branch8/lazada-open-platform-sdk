const LazadaClient = require('src/LazadaClient')
const { VENTURE } = require('src/LazadaClient/constants')

describe('test LazadaClient.js', () => {
  test('test create new LazadaClient', () => {
    const appKey = '123'
    const appSecret = 'abc'
    const lazadaClient = new LazadaClient(appKey, appSecret, VENTURE.SINGAPORE)
    expect(lazadaClient.appKey).toEqual(appKey)
    expect(lazadaClient.appSecret).toEqual(appSecret)
  })
})
