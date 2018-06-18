const signature = require('src/LazadaRequest/signature')

const { keysort, concatDictionaryKeyValue, signRequest } = signature

describe('test signature', () => {
  test('test keysort', () => {
    const unsort = {
      foo: 1,
      bar: 2,
      foo_bar: 3,
      foobar: 4,
    }
    const sort = {
      bar: 2,
      foo: 1,
      foo_bar: 3,
      foobar: 4,
    }
    expect(keysort(unsort)).toEqual(sort)
  })
  test('test concatDictionaryKeyValue', () => {
    const sort = {
      bar: 2,
      foo: 1,
      foo_bar: 3,
      foobar: 4,
    }
    const expected = 'bar2foo1foo_bar3foobar4'
    expect(concatDictionaryKeyValue(sort)).toEqual(expected)
  })
  test('test signRequest', () => {
    const secret = '1234'
    const api = '/test/api'
    const params = {
      foo: 1,
      bar: 2,
      foo_bar: 3,
      foobar: 4,
    }
    const hex = signRequest(secret, api, params)
    expect(hex).toMatchSnapshot()
  })
})
