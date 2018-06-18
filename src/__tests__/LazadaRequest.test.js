const LazadaRequest = require('sdk/LazadaRequest')

const { isResponseSuccessful, getSystemQueryParamObject } = LazadaRequest

describe('test LazadaRequest.js', () => {
  test('test [POST] getSystemQueryParamObject ', () => {
    const key = '1234'
    const secret = 'Aefi1239aspb203FS'
    const api = '/test/api'
    const body = {
      foo: 1,
      bar: 2,
      foo_bar: 3,
      foobar: 4,
    }
    const qs = getSystemQueryParamObject(key, secret, api, body)
    expect(qs).toMatchObject({
      app_key: '1234',
      timestamp: expect.any(String),
      sign_method: 'sha256',
      sign: expect.any(String),
    })
  })
  test('test [GET] getSystemQueryParamObject', () => {
    const key = '1234'
    const secret = 'Aefi1239aspb203FS'
    const api = '/test/api'
    const params = {
      foo: 1,
      bar: 2,
      foo_bar: 3,
      foobar: 4,
    }
    const qs = Object.assign(
      {},
      getSystemQueryParamObject(key, secret, api, params),
      params,
    )
    expect(qs).toMatchObject({
      foo: 1,
      bar: 2,
      foo_bar: 3,
      foobar: 4,
      app_key: '1234',
      timestamp: expect.any(String),
      sign_method: 'sha256',
      sign: expect.any(String),
    })
  })
  test('test isResponseSuccessful', () => {
    expect(isResponseSuccessful(null)).toBe(false)
    expect(isResponseSuccessful(undefined)).toBe(false)
    expect(isResponseSuccessful({ foo: 'bar' })).toBe(false)
    expect(isResponseSuccessful({ code: '' })).toBe(false)
    expect(isResponseSuccessful({ code: 'MissingParams' })).toBe(false)
    expect(isResponseSuccessful({ code: '0' })).toBe(true)
  })
})
