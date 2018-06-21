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

LazadaClient.orders = {}

/**
 *
 * @param {Object} payload
 *
 * created_after  // ISO 8601 date format, require if no update_after
 * created_before // ISO 8601 date format
 * update_after   // ISO 8601 date format, require if no update_after
 * update_before  // ISO 8601 date format
 *
 * status         // pending | canceled | ready_to_ship | delivered | returned | shipped | failed
 *
 * sort_by        // created_at | updated_at
 * sort_direction // ASC | DESC
 *
 * offset
 * limit          // max 100
 */
LazadaClient.orders.getOrders = (
  payload: AccessToken & {
    created_after?: string,
    created_before?: string,
    update_after?: string,
    update_before?: string,

    status?: OrderStatus,

    sort_by?: 'created_at' | 'updated_at',
    sort_direction?: 'ASC' | 'DESC',

    offset?: number,
    limit?: number,
  },
) => {
  const apiPath = '/orders/get'
  const params = payload

  // request object
  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Get the list of items for a single order.
 * @param {Object} payload
 * order_id
 */
LazadaClient.orders.getOrder = (
  payload: AccessToken & {
    order_id: number,
  },
) => {
  const apiPath = '/order/get'
  const params = payload

  // request object
  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Get the item information of an order.
 * @param {Object} payload
 * order_id {number| string}
 */
LazadaClient.orders.getOrderItems = (
  payload: AccessToken & {
    order_id: string,
  },
) => {
  const apiPath = '/order/items/get'
  const params = payload

  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Get the item information of one or more orders.
 * @param {Object} payload
 * order_ids // stringify JSON array [42922, 32793] (Max List Size: 1000)
 */
LazadaClient.orders.getMultipleOrderItems = (
  payload: AccessToken & {
    order_ids: string,
  },
) => {
  const apiPath = '/orders/items/get'
  const params = payload

  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Get additional error context for the SetStatusToCanceled API.
 * @param {Object} payload
 * access_token :require
 */
LazadaClient.orders.getFailureReasons = (payload: AccessToken) => {
  const apiPath = '/order/failure_reason/get'
  const params = payload

  // request object
  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Cancel a single order item.
 * @param {Object} payload
 * reason_detail
 * reason_id :require  | ID of the cancel reason.
 * order_item_id :require | Order item ID
 */
LazadaClient.orders.setStatusToCanceled = (
  payload: AccessToken & {
    reason_detail?: string,
    reason_id: number,
    order_item_id: number,
  },
) => {
  const apiPath = '/order/cancel'
  const params = payload

  // request object
  const rp = LazadaRequest.post(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Mark an order item as being ready to ship
 * @param {Object} payload
 * delivery_type     :require // dropship (Now only 'dropship' is supported.)
 * order_item_ids    :require // e.g. [1832590,1832592]
 * shipment_provider :require // name of shipment provider e.g. Aramax
 * tracking_number   :require
 */
LazadaClient.orders.setStatusToReadyToShip = (
  payload: AccessToken & {
    delivery_type: string,
    order_item_ids: string,
    shipment_provider: string,
    tracking_number: string,
  },
) => {
  const apiPath = '/order/rts'
  const params = payload

  // request object
  const rp = LazadaRequest.post(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Mark an order item as being packed.
 * All order items must have status 'pending'
 * @param {Object} payload
 * shipping_provider :require // name of shipment provider e.g. as  Aramax Mandatory for the "dropship" delivery type.
 * delivery_type     :require // dropship | pickup | send_to_warehouse
 * order_item_ids    :require stringify JSON array //  e.g. [1530553,1830236]
 */
LazadaClient.orders.setStatusToPackedByMarketplace = (
  payload: AccessToken & {
    shipping_provider: string,
    delivery_type: string,
    order_item_ids: string,
  },
) => {
  const apiPath = '/order/pack'
  const params = payload

  // request object
  const rp = LazadaRequest.post(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Set the invoice number for the specified order.
 * @param {Object} payload
 * order_item_id  :require
 * invoice_number : require
 */
LazadaClient.orders.setInvoiceNumber = (
  payload: AccessToken & {
    order_item_id: number,
    invoice_number: string,
  },
) => {
  const apiPath = '/order/invoice_number/set'
  const params = payload

  // request object
  const rp = LazadaRequest.post(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/**
 * Retrieve order-related documents, including invoices and shipping labels.
 * @param {Object} payload
 * access_token
 * doc_type       :require // invoice, shippingLabel, carrierManifest
 * order_item_ids :require // max list size: 100 stringify JSON array
 */
LazadaClient.orders.getDocument = (
  payload: AccessToken & {
    doc_type: string,
    order_item_ids: string,
  },
) => {
  const apiPath = '/order/document/get'
  const params = payload

  const rp = LazadaRequest.get(
    LazadaClient.baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
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
