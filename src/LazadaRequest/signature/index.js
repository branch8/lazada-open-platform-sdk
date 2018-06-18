// @flow
'use strict'
import crypto from 'crypto'
import type { KeyValueDictionary } from 'sdk/types/Common'

/**
 * Calculate a signature hash
 * @param {string} appSecret
 * @param {string} apiPath e.g. /order/get
 * @param {Object} params
 * @return {string} signature hash
 */
const signRequest = (
  appSecret: string,
  apiPath: string,
  params: KeyValueDictionary,
): string => {
  // 1. Sort all request parameters (except the “sign” and parameters with byte array type)
  const keysortParams = keysort(params)

  // 2. Concatenate the sorted parameters into a string i.e. "key" + "value" + "key2" + "value2"...
  const concatString = concatDictionaryKeyValue(keysortParams)

  // 3. Add API name in front of the string in (2)
  const preSignString = apiPath + concatString

  // 4. Encode the concatenated string in UTF-8 format & and make a digest (HMAC_SHA256)
  const hash = crypto
    .createHmac('sha256', appSecret)
    .update(preSignString)
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
 * { key: value } => 'keyvalue'
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
