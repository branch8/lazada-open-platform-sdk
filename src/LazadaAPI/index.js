// @flow
'use strict'

import LazadaClient from 'src/LazadaClient'
import type { Venture } from 'src/types/Common'
import { VENTURE, GATEWAY } from 'src/LazadaClient/constants'

/**
 * Class representing an API interface
 * @property {string} appKey
 * @property {string} appSecret
 * @property {Venture} countryCode
 * @property {string=} accessToken
 * @property {string} gatewayBaseURL
 * @property {LazadaClient} client
 */
class LazadaAPI {
  _appKey: string
  _appSecret: string
  _countryCode: Venture
  _accessToken: ?string
  _gatewayBaseURL: string
  _client: any

  /**
   * LazadaAPI constructor
   * @param {string} appKey
   * @param {string} appSecret
   * @param {Venture} countryCode
   * @param {string=} accessToken
   */
  constructor(
    appKey: string,
    appSecret: string,
    countryCode: Venture,
    accessToken: ?string,
  ) {
    if (!appKey) {
      throw new Error('Missing appKey')
    } else {
      this._appKey = appKey
    }
    if (!appSecret) {
      throw new Error('Missing appSecret')
    } else {
      this._appSecret = appSecret
    }
    if (!countryCode) {
      throw new Error('Missing countryCode')
    } else {
      this._countryCode = countryCode
    }

    switch (countryCode) {
      case VENTURE.SINGAPORE:
        this._gatewayBaseURL = GATEWAY.SINGAPORE
        break
      case VENTURE.THAILAND:
        this._gatewayBaseURL = GATEWAY.THAILAND
        break
      case VENTURE.MALAYSIA:
        this._gatewayBaseURL = GATEWAY.MALAYSIA
        break
      case VENTURE.VIETNAM:
        this._gatewayBaseURL = GATEWAY.VIETNAM
        break
      case VENTURE.PHILIPPINES:
        this._gatewayBaseURL = GATEWAY.PHILIPPINES
        break
      case VENTURE.INDONESIA:
        this._gatewayBaseURL = GATEWAY.INDONESIA
        break
      default:
        throw new Error('countryCode not supported')
      // break
    }
    this._client = new LazadaClient(appKey, appSecret, countryCode)
    this.accessToken = accessToken
  }

  /**
   * Get instance's app key
   * @return {string}
   */
  get appKey() {
    return this._appKey
  }

  /**
   * Get instance's app secret
   * @return {string}
   */
  get appSecret() {
    return this._appSecret
  }

  /**
   * Get instance's access token
   * @return {string}
   */
  get accessToken() {
    return this._accessToken
  }

  /**
   * Set instance's and client's access token (if given)
   * @param {string} token
   * @public
   * @return {void}
   */
  set accessToken(token: ?string) {
    if (token) {
      this._accessToken = token
      this.client.accessToken = token
    }
  }

  /**
   * Get instance's api location specific gateway
   * @return {string}
   */
  get gatewayBaseURL() {
    return this._gatewayBaseURL
  }

  /**
   * Set instance's api location specific gateway
   * @param {string} Url
   * @private
   * @return {void}
   */
  set gatewayBaseURL(Url: string) {
    if (Url) {
      this._gatewayBaseURL = Url
    }
  }

  /**
   * Get LazadaClient object
   * @return {LazadaClient}
   */
  get client() {
    return this._client
  }
}

module.exports = LazadaAPI
