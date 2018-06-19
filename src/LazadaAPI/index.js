// @flow
'use strict'

const LazadaClient = require('src/LazadaClient')

class LazadaAPI {
  _appKey: string
  _appSecret: string
  _countryCode: string
  _accessToken: ?string
  _client: LazadaClient
  constructor(
    appKey: string,
    appSecret: string,
    countryCode: string,
    accessToken: ?string,
  ) {
    this._appKey = appKey
    this._appSecret = appSecret
    this._countryCode = countryCode
    this._accessToken = accessToken
    this._client = new LazadaClient(appKey, appSecret, countryCode)
  }

  get appKey() {
    return this._appKey
  }

  get appSecret() {
    return this._appSecret
  }

  get accessToken() {
    return this._accessToken
  }

  set accessToken(token: string) {
    if (token) {
      this._accessToken = token
    }
  }

  get client() {
    return this._client
  }
}

module.exports = LazadaAPI
