/**
 * @flow
 */

import type { KeyValueDictionary } from 'src/types/Common'

export type HttpAction = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export type Protocol = 'HTTPS' | 'HTTP'

/**
 * SDK defined request meta data for debug purpose
 * @typedef SDKRequestMetaData
 * @property {string} method HttpAction
 * @property {string} apiPath api endpoint path
 * @property {Object} payload input
 * @property {Object} query after sign
 */
export type SDKRequestMetaData = {
  method: HttpAction,
  apiPath: string,
  payload?: KeyValueDictionary,
  query: KeyValueDictionary,
}

/**
 * Lazada API System Parameters
 * @typedef SystemQueryParams
 * @property {string} app_key :mandatory
 * @property {string} access_token :conditional
 * @property {string} timestamp :mandatory
 * @property {string} sign_method :mandatory 'sha256'
 * @property {string} sign :mandatory
 */
export type SystemQueryParams = {
  app_key: string,
  access_token?: string,
  timestamp: string,
  sign_method: string,
  sign: string,
}
