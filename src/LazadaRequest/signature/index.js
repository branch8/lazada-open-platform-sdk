// @flow
'use strict'
import crypto from 'crypto'
import type { KeyValueDictionary } from 'sdk/types/Common'

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
  const keysrtString = keysort(params)

  // 2. Concatenate the sorted parameters into a string i.e. "key" + "value" + "key2" + "value2"...
  const concatObjKeyValueString = concatDictionaryKeyValue(keysrtString)

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
 * Shallow copy an object with sorted keys
 * @param {Object} unordered
 * @return {Object} ordered
 */
const keysort = (unordered: KeyValueDictionary): KeyValueDictionary => {
  return Object.keys(unordered)
    .sort()
    .reduce((ordered, key) => {
      ordered[key] = unordered[key]
      return ordered
    }, {})
}

/**
 *
 * @param {Object} dictionary
 * @return {string} concatString
 */
const concatDictionaryKeyValue = (object: KeyValueDictionary): string => {
  return Object.keys(object).reduce(
    (concatString, key) => concatString.concat(key + object[key]),
    '',
  )
}

export { signRequest, keysort, concatDictionaryKeyValue }
