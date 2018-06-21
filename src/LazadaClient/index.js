// @flow
'use strict'
import LazadaRequest from 'src/LazadaRequest'
import type { AccessToken } from 'src/types/Common'
import type { ProductFilter } from './types/Product'
import type { OrderStatus } from './types/Order'
import { VENTURE, GATEWAY } from './constants'

const LazadaClient: any = {}

/** Auth **/

import { generateAccessToken, refreshAccessToken } from './system'

LazadaClient.generateAccessToken = payload => {
  return generateAccessToken(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    payload,
  )
}

LazadaClient.refreshAccessToken = payload => {
  return refreshAccessToken(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    payload,
  )
}

/** PRODUCTS ENDPOINT **/

import {
  getProducts,
  getCategoryTree,
  getCategoryAttributes,
  getBrands,
  createProduct,
  updateProduct,
  migrateImage,
  setImages,
  updatePriceQuantity,
  removeProduct,
} from './product'

LazadaClient.getProducts = payload => {
  return getProducts(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getCategoryTree = () => {
  return getCategoryTree(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.baseURL,
  )
}

LazadaClient.getCategoryAttributes = payload => {
  return getCategoryAttributes(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getBrands = payload => {
  return getBrands(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
  )
}

LazadaClient.createProduct = payload => {
  return createProduct(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.updateProduct = payload => {
  return updateProduct(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.migrateImage = payload => {
  return migrateImage(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.setImages = payload => {
  return setImages(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.updatePriceQuantity = payload => {
  return updatePriceQuantity(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.removeProduct = payload => {
  return removeProduct(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}
/** SALES ORDER ENDPOINT **/

import {
  getOrders,
  getOrder,
  getOrderItems,
  getMultipleOrderItems,
  getFailureReasons,
  setStatusToCanceled,
  setStatusToReadyToShip,
  setStatusToPackedByMarketplace,
  setInvoiceNumber,
  getDocument,
} from './order'

LazadaClient.getOrders = payload => {
  return getOrders(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getOrder = payload => {
  return getOrder(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getOrderItems = payload => {
  return getOrderItems(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getMultipleOrderItems = payload => {
  return getMultipleOrderItems(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getFailureReasons = payload => {
  return getFailureReasons(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.setStatusToCanceled = payload => {
  return setStatusToCanceled(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.setStatusToReadyToShip = payload => {
  return setStatusToReadyToShip(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.setStatusToPackedByMarketplace = payload => {
  return setStatusToPackedByMarketplace(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.setInvoiceNumber = payload => {
  return setInvoiceNumber(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

LazadaClient.getDocument = payload => {
  return getDocument(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    payload,
    LazadaClient.baseURL,
  )
}

/** SHIPMENT ENDPOINT **/

import { getShipmentProviders } from './logistics'

LazadaClient.getShipmentProviders = () => {
  return getShipmentProviders(
    LazadaClient.appKey,
    LazadaClient.appSecret,
    LazadaClient.accessToken,
    LazadaClient.baseURL,
  )
}

// constructor
module.exports = function(
  appKey: string,
  appSecret: string,
  countryCode: string,
) {
  if (!appKey) {
    throw new Error('Missing appKey')
  }

  if (!appSecret) {
    throw new Error('Missing appSecret')
  }

  if (!countryCode) {
    throw new Error('Missing countryCode')
  }

  LazadaClient.appKey = appKey
  LazadaClient.appSecret = appSecret

  switch (countryCode) {
    case VENTURE.SINGAPORE:
      LazadaClient.baseURL = GATEWAY.SINGAPORE
      break
    case VENTURE.THAILAND:
      LazadaClient.baseURL = GATEWAY.THAILAND
      break
    case VENTURE.MALAYSIA:
      LazadaClient.baseURL = GATEWAY.MALAYSIA
      break
    case VENTURE.VIETNAM:
      LazadaClient.baseURL = GATEWAY.VIETNAM
      break
    case VENTURE.PHILIPPINES:
      LazadaClient.baseURL = GATEWAY.PHILIPPINES
      break
    case VENTURE.INDONESIA:
      LazadaClient.baseURL = GATEWAY.INDONESIA
      break
    default:
      throw new Error('countryCode not supported')
    // break
  }

  return LazadaClient
}
