// @flow
'use strict'

import LazadaAPI from 'src/LazadaAPI'
module.exports = (
  appKey: string,
  appSecret: string,
  countryCode: string,
  accessToken: ?string,
) => {
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
