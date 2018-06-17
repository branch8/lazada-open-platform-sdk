/**
 * @flow
 */

import type { KeyValueDictionary } from '../../types/Common'

type HttpAction = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Lazada API success response object
 * @typedef SDKRequestMetaData
 * @property {string} method HttpAction
 * @property {string} apiPath api endpoint path
 * @property {Object} payload KeyValueDictionary
 */
export type SDKRequestMetaData = {
  method: HttpAction,
  apiPath: string,
  payload: KeyValueDictionary,
}
