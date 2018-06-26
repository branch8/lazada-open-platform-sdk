// @flow
'use strict'
import { GATEWAY } from './constants'
import LazadaRequest from 'src/LazadaRequest'
import { PROTOCOL, HTTP_ACTION } from 'src/LazadaRequest/constants'
import type { Protocol, HttpAction } from 'src/LazadaRequest/types/Request'

const getScheme = (protocol: Protocol): string => {
  return protocol === PROTOCOL.HTTP ? 'http://' : 'https://'
}

/**
 * Get the list of all active shipping providers, which is needed
 * when working with the SetStatusToPackedByMarketplace API.
 * access_token :require
 */
export const getShipmentProviders = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/shipment/providers/get'
  const baseURL = getScheme(protocol) + gateway
  if (action === HTTP_ACTION.GET) {
    return LazadaRequest.get(baseURL, appKey, appSecret, apiPath, accessToken)
  } else {
    return LazadaRequest.post(baseURL, appKey, appSecret, apiPath, accessToken)
  }
}

export default {}
