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
 * GET|POST /auth/token/create [No Auth Required]
 * Default POST
 * @param {Object} payload
 * @typedef payload
 * @property {string} code :require | oauth code, get from app callback URL
 * @property {string} uuid :optional | unique identifier, anti-replay
 * @param {HttpAction} action GET or POST default: POST
 */
const generateAccessToken: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string, // ignore
  accessToken: ?string, // ignore
  payload: {
    code: string, // oauth code, get from app callback URL
    uuid?: string, // unique identifier, anti-replay
  },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/auth/token/create'
  const authURL = getScheme(protocol) + GATEWAY.AUTH

  const request =
    action === HTTP_ACTION.GET ? LazadaRequest.get : LazadaRequest.post
  return request(authURL, appKey, appSecret, apiPath, undefined, payload)
}

/**
 * GET|POST /auth/token/refresh [No Auth Required]
 * Default POST
 * @param {Object} payload
 * @typedef payload
 * @property {string} refresh_token :require
 * @param {HttpAction} action GET or POST default: POST
 */
const refreshAccessToken: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string, // ignore
  accessToken: ?string, // ignore
  payload: { refresh_token: string },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/auth/token/refresh'
  const authURL = getScheme(protocol) + GATEWAY.AUTH

  const request =
    action === HTTP_ACTION.GET ? LazadaRequest.get : LazadaRequest.post
  return request(authURL, appKey, appSecret, apiPath, undefined, payload)
}

export default {
  generateAccessToken,
  refreshAccessToken,
}
