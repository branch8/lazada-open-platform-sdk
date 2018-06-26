// @flow
'use strict'

import { GATEWAY } from './constants'
import type { ProductFilter } from './types/Product'

import LazadaRequest from 'src/LazadaRequest'
import { PROTOCOL, HTTP_ACTION } from 'src/LazadaRequest/constants'
import type { Protocol, HttpAction } from 'src/LazadaRequest/types/Request'

const getScheme = (protocol: Protocol): string => {
  return protocol === PROTOCOL.HTTP ? 'http://' : 'https://'
}

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
export const getProducts = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
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
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/products/get'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.get(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 * Retrieve the list of all product categories in the system
 */
export const getCategoryTree = (
  appKey: string,
  appSecret: string,
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/category/tree/get'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.get(baseURL, appKey, appSecret, apiPath, undefined)
}

/**
 * Get a list of attributes for a specified product category.
 * @param {Object} payload
 * primary_category_id :require
 */
export const getCategoryAttributes = (
  appKey: string,
  appSecret: string,
  payload: {
    primary_category_id: string,
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/category/attributes/get'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.get(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    undefined,
    payload,
  )
}

/**
 * Retrieve all product brands in the system.
 * @param {Object} payload
 * offset :require
 * limit  :require // default 100, maximum 1,000
 */
export const getBrands = (
  appKey: string,
  appSecret: string,
  payload: { offset: string, limit: string },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/brands/get'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.get(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    undefined,
    payload,
  )
}

/**
 * TODO:
 * @param {Object} payload xml string
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108253
 */
export const createProduct = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    payload: string,
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/product/create'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 *
 * @param {Object} payload
 * payload xml string
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.6e6e38e475ZXlW#?nodeId=10557&docId=108252
 */
export const updateProduct = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    payload: string,
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/product/update'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 * Migrate a single image from an external site to Lazada site.
 * Allowed image formats are JPG and PNG.
 * The maximum size of an image file is 1MB.
 * @param {Object} payload
 * ??
 */
export const migrateImage = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    payload: string, // xml string
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/image/migrate'
  const baseURL = getScheme(protocol) + gateway

  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 * Set the images for an existing product by associating one or more image URLs with it.
 * @param {Object} payload
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108254
 */
export const setImages = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    payload: string, // xml string
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/images/set'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 * Update the price and quantity of one or more existing products.
 * The maximum number of products that can be updated is 50, but 20 is recommended.
 * @param {string} payload
 * @ref https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.2de238e4eebY8v#?nodeId=10557&docId=108251
 */
export const updatePriceQuantity = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    payload: string,
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/product/price_quantity/update'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

/**
 * To remove an existing product, some SKUs in one product, or all SKUs in one product.
 * System supports a maximum number of 50 SellerSkus in one request
 * @param {Object} payload
 * seller_sku_list // Seller SKU in a json list e.g. ["asd","vvv","sss"], max 50 SellerSkus
 */
export const removeProduct = (
  appKey: string,
  appSecret: string,
  accessToken: string,
  payload: {
    seller_sku_list: string,
  },
  gateway: string,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/product/remove'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.post(
    baseURL,
    appKey,
    appSecret,
    apiPath,
    accessToken,
    payload,
  )
}

export default {}
