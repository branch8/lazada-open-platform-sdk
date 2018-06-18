// @flow
'use strict'
import type { AccessToken, ProductFilter, OrderStatus } from './types'
const LazadaRequest = require('../LazadaRequest')

const LazadaClient = {}

/** API ENDPOINT **/

LazadaClient.CONSTANTS_COUNTRY_SG = 'SG'
LazadaClient.CONSTANTS_COUNTRY_TH = 'TH'
LazadaClient.CONSTANTS_COUNTRY_MY = 'MY'
LazadaClient.CONSTANTS_COUNTRY_VN = 'VN'
LazadaClient.CONSTANTS_COUNTRY_PH = 'PH'
LazadaClient.CONSTANTS_COUNTRY_ID = 'ID'

LazadaClient.CONSTANTS_URL_API_SG = 'https://api.lazada.sg/rest'
LazadaClient.CONSTANTS_URL_API_TH = 'https://api.lazada.co.th/rest'
LazadaClient.CONSTANTS_URL_API_MY = 'https://api.lazada.com.my/rest'
LazadaClient.CONSTANTS_URL_API_VN = 'https://api.lazada.vn/rest'
LazadaClient.CONSTANTS_URL_API_PH = 'https://api.lazada.com.ph/rest'
LazadaClient.CONSTANTS_URL_API_ID = 'https://api.lazada.co.id/rest'

/** Auth **/

/**
 * Generate `access_token` for api call
 */
LazadaClient.authenticate = (params: {
  code: string, // oauth code, get from app callback URL
  uuid?: string, // unique identifier, anti-replay
}) => {
  const baseURL = 'https://auth.lazada.com/rest'
  const apiPath = '/auth/token/create'

  const rp = LazadaRequest.get(
    baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

LazadaClient.refreshAccessToken = (params: { refresh_token: string }) => {
  const baseURL = 'https://auth.lazada.com/rest'
  const apiPath = '/auth/token/refresh'

  const rp = LazadaRequest.get(
    baseURL,
    LazadaClient.appKey,
    LazadaClient.appSecret,
    apiPath,
    params,
  )
  return rp
}

/** PRODUCTS ENDPOINT **/

LazadaClient.products = {}

/**
 * getProducts GET /products/get
 * @param {Object} payload
 * filter           :require 'all', 'live', 'inactive', 'deleted', 'image-missing', 'pending', 'rejected', 'sold-out'
 * search            search by product name and/or Seller SKU.
 * offset
 * limit             20 as default. maximum products 500.
 * options           Options=1 means contain ReservedStock, RtsStock, PendingStock, RealTimeStock, FulfillmentBySellable.
 * sku_seller_list   JSON array (stringify). A maximum of 100 SKUs can be returned.
 * update_before     ISO 8601 date format
 * create_before     ISO 8601 date format
 * create_after      ISO 8601 date format
 * update_after      ISO 8601 date format
 */
LazadaClient.products.getProducts = (
  payload: AccessToken & {
    filter: ProductFilter,
    search?: string,
    offset?: number,
    limit?: number,
    options?: number,
    sku_seller_list?: string,
    update_before?: string,
    create_before?: string,
    create_after?: string,
    update_after?: string,
  },
) => {
  const apiPath = '/products/get'
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
 * Retrieve the list of all product categories in the system
 */
LazadaClient.products.getCategoryTree = () => {
  const apiPath = '/category/tree/get'
  const params = {}

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
 * Get a list of attributes for a specified product category.
 * @param {Object} payload
 * primary_category_id :require
 */
LazadaClient.products.getCategoryAttributes = (payload: {
  primary_category_id: string,
}) => {
  const apiPath = '/category/attributes/get'
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
 * Retrieve all product brands in the system.
 * @param {Object} payload
 * offset :require
 * limit  :require // default 100, maximum 1,000
 */
LazadaClient.products.getBrands = (payload: {
  offset: string,
  limit: string,
}) => {
  const apiPath = '/brands/get'
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
 *
 * @param {Object} payload
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108253
 */
LazadaClient.products.createProduct = (
  payload: AccessToken & {
    payload: string,
  },
) => {
  const apiPath = '/product/create'
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
 *
 * @param {Object} payload
 * payload xml string
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.6e6e38e475ZXlW#?nodeId=10557&docId=108252
 */
LazadaClient.products.updateProduct = (
  payload: AccessToken & {
    payload: string,
  },
) => {
  const apiPath = '/product/update'
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
 * Migrate a single image from an external site to Lazada site.
 * Allowed image formats are JPG and PNG.
 * The maximum size of an image file is 1MB.
 * @param {Object} payload
 * ??
 */
LazadaClient.products.migrateImage = (
  payload: AccessToken & {
    payload: string, // xml string
  },
) => {
  const apiPath = '/image/migrate'
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
 * Set the images for an existing product by associating one or more image URLs with it.
 * @param {Object} payload
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108254
 */
LazadaClient.products.setImages = (
  payload: AccessToken & {
    payload: string, // xml string
  },
) => {
  const apiPath = '/images/set'
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
 * Update the price and quantity of one or more existing products.
 * The maximum number of products that can be updated is 50, but 20 is recommended.
 * @param {string} payload
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108251
 */
LazadaClient.products.updatePriceQuantity = (
  payload: AccessToken & {
    payload: string,
  },
) => {
  const apiPath = '/product/price_quantity/update'
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
 * To remove an existing product, some SKUs in one product, or all SKUs in one product.
 * System supports a maximum number of 50 SellerSkus in one request
 * @param {Object} payload
 * seller_sku_list // Seller SKU in a json list e.g. ["asd","vvv","sss"], max 50 SellerSkus
 */
LazadaClient.products.removeProduct = (
  payload: AccessToken & {
    seller_sku_list: string,
  },
) => {
  const apiPath = '/product/remove'
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

LazadaClient.shipment = {}

/**
 * Get the list of all active shipping providers, which is needed
 * when working with the SetStatusToPackedByMarketplace API.
 * @param {Object} payload
 * access_token :require
 */
LazadaClient.shipment.getShipmentProviders = (payload: AccessToken) => {
  const apiPath = '/shipment/providers/get'
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
    case LazadaClient.CONSTANTS_COUNTRY_SG:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_SG
      break
    case LazadaClient.CONSTANTS_COUNTRY_TH:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_TH
      break
    case LazadaClient.CONSTANTS_COUNTRY_MY:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_MY
      break
    case LazadaClient.CONSTANTS_COUNTRY_VN:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_VN
      break
    case LazadaClient.CONSTANTS_COUNTRY_PH:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_PH
      break
    case LazadaClient.CONSTANTS_COUNTRY_ID:
      LazadaClient.baseURL = LazadaClient.CONSTANTS_URL_API_ID
      break
    default:
      throw new Error('countryCode not supported')
    // break
  }

  return LazadaClient
}
