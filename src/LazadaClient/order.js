// @flow
'use strict'
import { GATEWAY } from './constants'
import type { APIAction } from './types/Common'
import type { OrderStatus } from './types/Order'
import LazadaRequest from 'src/LazadaRequest'
import { PROTOCOL, HTTP_ACTION } from 'src/LazadaRequest/constants'
import type { Protocol, HttpAction } from 'src/LazadaRequest/types/Request'

const getScheme = (protocol: Protocol): string => {
  return protocol === PROTOCOL.HTTP ? 'http://' : 'https://'
}

/**
 *
 * @param {Object} payload
 *
 * created_after  // ISO 8601 date format, require if no update_after
 * created_before // ISO 8601 date format
 * update_after   // ISO 8601 date format, require if no update_after
 * update_before  // ISO 8601 date format
 *
 * status         // unpaid | pending | packed | canceled | ready_to_ship | delivered | lost_by_3pl | damaged_by_3pl | failed_delivery | returned | shipped | failed 
 *
 * sort_by        // created_at | updated_at
 * sort_direction // ASC | DESC
 *
 * offset
 * limit          // max 100
 */
const getOrders: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
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
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/orders/get'
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
 * Get the list of items for a single order.
 * @param {Object} payload
 * order_id
 */
const getOrder: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    order_id: number,
  },
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/get'
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
 * Get the item information of an order.
 * @param {Object} payload
 * order_id {number| string}
 */
const getOrderItems: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    order_id: string,
  },
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/items/get'
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
 * Get the item information of one or more orders.
 * @param {Object} payload
 * order_ids // stringify JSON array [42922, 32793] (Max List Size: 1000)
 */
const getMultipleOrderItems: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    order_ids: string,
  },
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/orders/items/get'
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
 * Get additional error context for the SetStatusToCanceled API.
 * @param {Object} payload
 * access_token :require
 */
const getFailureReasons: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: any,
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/failure_reason/get'
  const baseURL = getScheme(protocol) + gateway
  return LazadaRequest.get(baseURL, appKey, appSecret, apiPath, accessToken)
}

/**
 * Cancel a single order item.
 * @param {Object} payload
 * reason_detail
 * reason_id :require  | ID of the cancel reason.
 * order_item_id :require | Order item ID
 */
const setStatusToCanceled: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    reason_detail?: string,
    reason_id: number,
    order_item_id: number,
  },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/cancel'
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
 * Mark an order item as being ready to ship
 * @param {Object} payload
 * delivery_type     :require // dropship (Now only 'dropship' is supported.)
 * order_item_ids    :require // e.g. [1832590,1832592]
 * shipment_provider :require // name of shipment provider e.g. Aramax
 * tracking_number   :require
 */
const setStatusToReadyToShip: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    delivery_type: string,
    order_item_ids: string,
    shipment_provider: string,
    tracking_number: string,
  },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/rts'
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
 * Mark an order item as being packed.
 * All order items must have status 'pending'
 * @param {Object} payload
 * shipping_provider :require // name of shipment provider e.g. as  Aramax Mandatory for the "dropship" delivery type.
 * delivery_type     :require // dropship | pickup | send_to_warehouse
 * order_item_ids    :require stringify JSON array //  e.g. [1530553,1830236]
 */
const setStatusToPackedByMarketplace: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    shipping_provider: string,
    delivery_type: string,
    order_item_ids: string,
  },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/pack'
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
 * Set the invoice number for the specified order.
 * @param {Object} payload
 * order_item_id  :require
 * invoice_number : require
 */
const setInvoiceNumber: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    order_item_id: number,
    invoice_number: string,
  },
  action?: HttpAction = HTTP_ACTION.POST,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/invoice_number/set'
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
 * Retrieve order-related documents, including invoices and shipping labels.
 * @param {Object} payload
 * access_token
 * doc_type       :require // invoice, shippingLabel, carrierManifest
 * order_item_ids :require // max list size: 100 stringify JSON array
 */
const getDocument: APIAction = (
  appKey: string,
  appSecret: string,
  gateway: string,
  accessToken: ?string,
  payload: {
    doc_type: string,
    order_item_ids: string,
  },
  action?: HttpAction = HTTP_ACTION.GET,
  protocol?: Protocol = PROTOCOL.HTTPS,
) => {
  const apiPath = '/order/document/get'
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

export default {
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
}
