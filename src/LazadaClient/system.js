// @flow
'use strict'
import { GATEWAY } from './constants'
import LazadaRequest from 'src/LazadaRequest'
import { PROTOCOL, HTTP_ACTION } from 'src/LazadaRequest/constants'
import type { Protocol, HttpAction } from 'src/LazadaRequest/types/Request'

const getScheme = (protocol: Protocol): string => {
  return protocol === PROTOCOL.HTTP ? 'http://' : 'https://'
}
export const generateAccessToken = (
  protocol: Protocol,
  action: HttpAction,
  appKey: string,
  appSecret: string,
  params: {
    code: string, // oauth code, get from app callback URL
    uuid?: string, // unique identifier, anti-replay
  },
) => {
  const apiPath = '/auth/token/create'
  const baseURL = getScheme(protocol) + GATEWAY.AUTH
  if (action === HTTP_ACTION.GET) {
    return LazadaRequest.get(baseURL, appKey, appSecret, apiPath, params)
  } else {
    return LazadaRequest.post(baseURL, appKey, appSecret, apiPath, params)
  }
}

export const refreshAccessToken = (
  protocol: Protocol,
  action: HttpAction,
  appKey: string,
  appSecret: string,
  params: { refresh_token: string },
) => {
  const apiPath = '/auth/token/refresh'
  const baseURL = getScheme(protocol) + GATEWAY.AUTH
  // GET OR POST
  if (action === HTTP_ACTION.GET) {
    return LazadaRequest.get(baseURL, appKey, appSecret, apiPath, params)
  } else {
    return LazadaRequest.post(baseURL, appKey, appSecret, apiPath, params)
  }
}
