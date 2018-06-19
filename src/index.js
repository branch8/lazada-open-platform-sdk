// @flow
'use strict'

import LazadaAPI from 'src/LazadaAPI'
import type { Venture } from 'src/types/Common'
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
        return aLazadaAPI.client[property]
      }
      return undefined
    },
  }
  const lazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)
  return new Proxy(lazadaAPI, forwardPropertyHandler)
}
