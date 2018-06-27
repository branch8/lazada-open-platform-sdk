// @flow
'use strict'
import { GATEWAY } from './constants'
import type { APIAction } from './types/Common'
import LazadaRequest from 'src/LazadaRequest'
import { PROTOCOL, HTTP_ACTION } from 'src/LazadaRequest/constants'
import type { Protocol, HttpAction } from 'src/LazadaRequest/types/Request'

const getScheme = (protocol: Protocol): string => {
  return protocol === PROTOCOL.HTTP ? 'http://' : 'https://'
}

/**
 * GET /shipment/providers/get [Auth Required]
 * Get the list of all active shipping providers, which is needed
 * when working with the SetStatusToPackedByMarketplace API.
 */
const getShipmentProviders: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: any,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/shipment/providers/get'
  const baseURL = getScheme(protocol) + gateway
  const request = LazadaRequest.get
  return request(baseURL, appKey, appSecret, apiPath, accessToken)
}

export default {
  getShipmentProviders,
}
