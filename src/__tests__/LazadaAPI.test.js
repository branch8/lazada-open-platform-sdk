const faker = require('faker')
const LazadaAPI = require('src/LazadaAPI')
const { VENTURE, GATEWAY } = require('src/LazadaClient/constants')

describe('test LazadaAPI.js', () => {
  test('test create new LazadaAPI', () => {
    const appKey = faker.random.word()
    const appSecret = faker.random.uuid()
    const lazadaAPI = new LazadaAPI(appKey, appSecret, VENTURE.SINGAPORE)
    expect(lazadaAPI.appKey).toEqual(appKey)
    expect(lazadaAPI.appSecret).toEqual(appSecret)
    expect(lazadaAPI.gateway).toEqual(GATEWAY.SINGAPORE)
  })

  test('test create new LazadaAPI: missing appKey', () => {
    const createLazadaAPIObject = () => {
      return new LazadaAPI('', '', VENTURE.SINGAPORE)
    }
    expect(createLazadaAPIObject).toThrow()
  })

  test('test create new LazadaAPI: missing appSecret', () => {
    const appKey = faker.random.word()
    const createLazadaAPIObject = () => {
      return new LazadaAPI(appKey, '', VENTURE.SINGAPORE)
    }
    expect(createLazadaAPIObject).toThrow()
  })

  test('test create new LazadaAPI: missing countryCode', () => {
    const appKey = faker.random.word()
    const appSecret = faker.random.uuid()
    const createLazadaAPIObject = () => {
      return new LazadaAPI(appKey, appSecret, '')
    }
    expect(createLazadaAPIObject).toThrow()
  })

  test('test create new LazadaAPI: invalid countryCode', () => {
    const appKey = faker.random.word()
    const appSecret = faker.random.uuid()
    const countryCode = faker.random.number().toString()
    const createLazadaAPIObject = () => {
      return new LazadaAPI(appKey, appSecret, countryCode)
    }
    expect(createLazadaAPIObject).toThrow()
  })

  test('test correct LazadaAPI gateway', () => {
    const appKey = faker.random.word()
    const appSecret = faker.random.uuid()
    const lazadaAPI_SG = new LazadaAPI(appKey, appSecret, VENTURE.SINGAPORE)
    expect(lazadaAPI_SG.gateway).toEqual(GATEWAY.SINGAPORE)

    const lazadaAPI_TH = new LazadaAPI(appKey, appSecret, VENTURE.THAILAND)
    expect(lazadaAPI_TH.gateway).toEqual(GATEWAY.THAILAND)

    const lazadaAPI_MA = new LazadaAPI(appKey, appSecret, VENTURE.MALAYSIA)
    expect(lazadaAPI_MA.gateway).toEqual(GATEWAY.MALAYSIA)

    const lazadaAPI_VI = new LazadaAPI(appKey, appSecret, VENTURE.VIETNAM)
    expect(lazadaAPI_VI.gateway).toEqual(GATEWAY.VIETNAM)

    const lazadaAPI_PH = new LazadaAPI(appKey, appSecret, VENTURE.PHILIPPINES)
    expect(lazadaAPI_PH.gateway).toEqual(GATEWAY.PHILIPPINES)

    const lazadaAPI_IN = new LazadaAPI(appKey, appSecret, VENTURE.INDONESIA)
    expect(lazadaAPI_IN.gateway).toEqual(GATEWAY.INDONESIA)
  })
})
