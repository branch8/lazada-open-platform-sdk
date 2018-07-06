// @flow
'use strict'

import LazadaAPI from 'src/LazadaAPI'
import type { Venture } from 'src/types/Common'

/**
 * @typedef {string} Venture API gateway venture
 */

/**
 * Creates a new API object
 * @class
 * @example
 * // init with no access token
 * const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode)
 * const accessToken = // get access token...
 * aLazadaAPI.accessToken = accessToken // set access token
 * @example
 * // init with access token
 * const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)
 * @param {string} appKey
 * @param {string} appSecret
 * @param {Venture} countryCode
 * @param {string=} accessToken
 */
module.exports = (
  appKey: string,
  appSecret: string,
  countryCode: Venture,
  accessToken: ?string,
) => {
  /**
   * Create a proxy and forward any unrecognisable properties/methods to `client`
   */
  const forwardPropertyHandler = {
    get: (aLazadaAPI, property) => {
      if (property in aLazadaAPI) {
        return (aLazadaAPI: Object)[property]
      } else if (aLazadaAPI.client !== undefined) {
        const action = aLazadaAPI.client[property]
        if (!action) return undefined
        return args => {
          return action(
            aLazadaAPI.appKey,
            aLazadaAPI.appSecret,
            aLazadaAPI.gateway,
            aLazadaAPI.accessToken,
            args,
          )
        }
      }
      return undefined
    },
  }
  const lazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)
  return new Proxy(lazadaAPI, forwardPropertyHandler)
}
