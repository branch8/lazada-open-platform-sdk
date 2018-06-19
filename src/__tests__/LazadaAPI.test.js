const LazadaAPI = require('src/LazadaAPI')
const { VENTURE } = require('src/LazadaClient/constants')

describe('test LazadaAPI.js', () => {
  test('test create new LazadaAPI', () => {
    console.log(LazadaAPI)
    const appKey = '123'
    const appSecret = 'abc'
    const lazadaAPI = new LazadaAPI(appKey, appSecret, VENTURE.SINGAPORE)
    console.log(lazadaAPI)
  })
})
