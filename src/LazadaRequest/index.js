// @flow
'use strict'

import rp from 'request-promise'

import { RESPONSE } from './constants'
import { signRequest } from './signature'
import type { KeyValueDictionary } from 'src/types/Common'
import type { SDKRequestMetaData, SystemQueryParams } from './types/Request'
import type { LazadaOpenPlatformAPIResponse } from './types/Response'

const isResponseSuccessful = (
  response: LazadaOpenPlatformAPIResponse | any,
): boolean => {
  return (
    typeof response === 'object' &&
    response !== null &&
    response.hasOwnProperty('code') &&
    response.code === RESPONSE.SUCCESS.CODE
  )
}

const handleLazadaResponse = (
  response: LazadaOpenPlatformAPIResponse,
  meta: SDKRequestMetaData,
): Promise<LazadaOpenPlatformAPIResponse> => {
  // for debug only
  const _log_request = (
    { method, apiPath, payload, query }: SDKRequestMetaData,
    response,
  ) => {
    console.info(
      '[%s] '.replace(/%s/, method) + apiPath,
      ' ',
      payload,
      ' ',
      query,
    )
    console.log(JSON.stringify(response, null, 2))
  }
  // _log_request(meta, response)
  if (isResponseSuccessful(response)) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

const get = (
  base: string,
  appKey: string,
  appSecret: string,
  apiPath: string,
  accessToken?: string,
  params?: KeyValueDictionary,
): Promise<LazadaOpenPlatformAPIResponse> => {
  const qs = Object.assign(
    {},
    params,
    getSystemQueryParamObject(appKey, appSecret, apiPath, accessToken, params),
  )

  return rp({
    url: base + apiPath,
    qs,
    json: true,
  }).then(response => {
    const meta = {
      method: 'GET',
      apiPath,
      payload: params,
      query: qs,
    }
    return handleLazadaResponse(response, meta)
  })
}

const post = (
  base: string,
  appKey: string,
  appSecret: string,
  apiPath: string,
  accessToken?: string,
  body?: KeyValueDictionary,
): Promise<LazadaOpenPlatformAPIResponse> => {
  // turns out even it's HTTP POST, Lazada expect `body` to be part of query string
  const qs = Object.assign(
    {},
    body,
    getSystemQueryParamObject(appKey, appSecret, apiPath, accessToken, body),
  )
  return rp({
    method: 'POST',
    url: base + apiPath,
    qs,
    json: true,
    body,
  }).then(response => {
    const meta = {
      method: 'POST',
      apiPath,
      payload: body,
      query: qs,
    }
    return handleLazadaResponse(response, meta)
  })
}

/**
 * Gather system and business parameters to compute signature
 * @param {string} appKey
 * @param {string} appSecret
 * @param {string} apiPath
 * @param {string?} accessToken
 * @param {KeyValueDictionary?} payload
 * @return {SystemQueryParams}
 */
const getSystemQueryParamObject = (
  appKey: string,
  appSecret: string,
  apiPath: string,
  accessToken?: string,
  payload?: KeyValueDictionary,
): SystemQueryParams => {
  const systemParams: {
    app_key: string,
    timestamp: string,
    sign_method: string,
    access_token?: string,
  } = {
    app_key: appKey,
    timestamp: Date.now().toString(),
    sign_method: 'sha256',
  }

  if (accessToken) {
    systemParams.access_token = accessToken
  }

  return Object.assign(
    {},
    {
      sign: signRequest(
        appSecret,
        apiPath,
        Object.assign({}, payload, systemParams),
      ),
    },
    systemParams,
  )
}

// constructor
module.exports = {
  get: get,
  post: post,
  isResponseSuccessful: isResponseSuccessful,
  // helper
  getSystemQueryParamObject: getSystemQueryParamObject,
}
