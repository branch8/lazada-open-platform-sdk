// @flow
'use strict'
import { GATEWAY } from './constants'
export const generateAccessToken = (
  lazadaRequest: any,
  appKey: string,
  appSecret: string,
  params: {
    code: string, // oauth code, get from app callback URL
    uuid?: string, // unique identifier, anti-replay
  },
) => {
  const baseURL = 'https://' + GATEWAY.AUTH
  const apiPath = '/auth/token/create'
  // GET OR POST
  return lazadaRequest(baseURL, appKey, appSecret, apiPath, params)
}

export const refreshAccessToken = (
  lazadaRequest: any,
  appKey: string,
  appSecret: string,
  params: { refresh_token: string },
) => {
  const baseURL = 'https' + GATEWAY.AUTH
  const apiPath = '/auth/token/refresh'
  // GET OR POST
  return lazadaRequest(baseURL, appKey, appSecret, apiPath, params)
}
