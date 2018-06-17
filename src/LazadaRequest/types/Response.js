/**
 * @flow
 */

/**
 * Lazada API success response object
 * @typedef LazadaOpenPlatformAPIResponseSuccess
 * @property {string} request_id hash id
 * @property {string} code should always == "0"
 * @property {Object} data
 */
export type LazadaOpenPlatformAPIResponseSuccess = {
  request_id: string,
  code: '0',
  data: any,
}

/**
 * Lazada API error response object
 * @typedef LazadaOpenPlatformAPIResponseError
 * @property {string} request_id hash id
 * @property {string} code non "0" value
 * @property {string} type SYSTEM (API platform error), ISV (Business data error), ISP (Backend service error)
 * @property {string} message error message
 */
type LazadaAPICommonErrorType = 'SYSTEM' | 'ISV' | 'ISP'
export type LazadaOpenPlatformAPIResponseError = {
  request_id: string,
  code: string,
  type: LazadaAPICommonErrorType | string,
  message: string,
}

export type LazadaOpenPlatformAPIResponse =
  | LazadaOpenPlatformAPIResponseSuccess
  | LazadaOpenPlatformAPIResponseError
