// @flow
'use strict'

const crypto = require('crypto')
const request = require('request')
const rp = require('request-promise')

/**
 * API success response object
 * @typedef LazadaOpenPlatformAPIResponseSuccess
 * @property {string} request_id hash id
 * @property {string} code should always == "0"
 * @property {Object} data
 */

const SUCCESS_CODE = '0'

/**
 * API error response object
 * @typedef LazadaOpenPlatformAPIResponseError
 * @property {string} request_id hash id
 * @property {string} code non "0" value
 * @property {string} type SYSTEM (API platform error), ISV (Business data error), ISP (Backend service error)
 * @property {string} message error message
 */

const ERROR_TYPE_API_PLATFORM_DATA_ERROR = 'SYSTEM'
const ERROR_TYPE_BUSINESS_DATA_ERROR = 'ISV'
const ERROR_TYPE_BACKEND_SERVICE_ERROR = 'ISP'

const ERROR_LAZADA = 'ERROR_LAZADA'

const _log_request = ({ method, apiPath, params, res }) => {
  console.info('[%s] '.replace(/%s/, method) + apiPath + ' ', params)
  console.log(JSON.stringify(res, null, 2))
}

import type {
  KeyValueDictionary,
  ResponseObject,
  SystemQueryParams,
} from './types'

const isResponseSuccessful = (response: ResponseObject): boolean =>
  typeof response === 'object' &&
  response !== null &&
  response.hasOwnProperty('code') &&
  response.code === SUCCESS_CODE

const handleLazadaResponse = (
  response: ResponseObject,
  meta: {
    apiPath: string,
  },
): Promise<ResponseObject> =>
  isResponseSuccessful(response)
    ? Promise.resolve(response)
    : Promise.reject({ response, meta })

const get = (
  base: string,
  appKey: string,
  appSecret: string,
  apiPath: string,
  params: KeyValueDictionary,
): Promise<ResponseObject> => {
  const qs = Object.assign(
    {},
    params,
    getSystemQueryParamObject(appKey, appSecret, apiPath, params),
  )

  return rp({
    url: base + apiPath,
    qs,
    json: true,
  }).then(response => {
    // _log_request({
    //   method: 'GET',
    //   apiPath: apiPath,
    //   params: params,
    //   res: response,
    // })
    return handleLazadaResponse(response, { apiPath, payload: params })
  })
}

const post = (
  base: string,
  appKey: string,
  appSecret: string,
  apiPath: string,
  body: KeyValueDictionary,
): Promise<ResponseObject> => {
  // turns out even it's HTTP POST, Lazada expect `body` to be part of query string
  const qs = Object.assign(
    {},
    body,
    getSystemQueryParamObject(appKey, appSecret, apiPath, body),
  )
  return rp({
    method: 'POST',
    url: base + apiPath,
    qs,
    json: true,
    body,
  }).then(response => {
    // _log_request({
    //   method: 'POST',
    //   apiPath: apiPath,
    //   params: body,
    //   res: response,
    // })
    return handleLazadaResponse(response, { apiPath, payload: body })
  })
}

const getSystemQueryParamObject = (
  appKey: string,
  appSecret: string,
  apiPath: string,
  payload: KeyValueDictionary,
): SystemQueryParams => {
  const systemParams = {
    app_key: appKey,
    timestamp: Date.now().toString(),
    sign_method: 'sha256',
  }
  // get access_token out of `payload`
  const access_token = payload.access_token
    ? payload.access_token.toString()
    : ''

  return Object.assign(
    {},
    {
      sign: signRequest(
        appSecret,
        apiPath,
        Object.assign({}, payload, systemParams),
      ),
      access_token,
    },
    systemParams,
  )
}

/**
 *
 * @param {string} appSecret
 * @param {string} apiPath e.g. /order/get
 * @param {Object} params
 * @return {string}
 */
const signRequest = (
  appSecret: string,
  apiPath: string,
  params: KeyValueDictionary,
): string => {
  /**
   * @ref: https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.658f38e4vB7vKL#?nodeId=10450&docId=108068
   */
  // 1. Sort all request parameters (except the “sign” and parameters with byte array type)
  const keysrtString = keysrt(params)

  // 2. Concatenate the sorted parameters into a string i.e. "key" + "value" + "key2" + "value2"...
  const concatObjKeyValueString = concatObjKeyValue(keysrtString)

  // 3. Add API name in front of the string in (2)
  const queryString = apiPath + concatObjKeyValueString

  // 4. Encode the concatenated string in UTF-8 format & and make a digest (HMAC_SHA256)
  const hash = crypto
    .createHmac('sha256', appSecret)
    .update(queryString)
    // 5. Convert the digest to hexadecimal format
    .digest('hex')

  return hash.toUpperCase() // must use upper case
}

/**
 *
 * @param {Object} unordered
 * @return {Object}
 */
const keysrt = (unordered: KeyValueDictionary): KeyValueDictionary =>
  Object.keys(unordered)
    .sort()
    .reduce((result, key) => {
      result[key] = unordered[key]
      return result
    }, {})

/**
 *
 * @param {Object} object
 * @return {string}
 */
const concatObjKeyValue = (object: KeyValueDictionary): string =>
  Object.keys(object).reduce(
    (result, key) => result.concat(key + object[key]),
    '',
  )

// constructor
module.exports = {
  get: get,
  post: post,
  isResponseSuccessful: isResponseSuccessful,
  // helper
  keysrt: keysrt,
  concatObjKeyValue: concatObjKeyValue,
  signRequest: signRequest,
  getSystemQueryParamObject: getSystemQueryParamObject,
}
