/**
 * @file test script for src/LazadaClient
 */
const LazadaClient = require('src/LazadaClient')
const { VENTURE } = require('src/LazadaClient/constants')

describe('test LazadaClient.js', () => {
  test("test LazadaClient 'system' namespace action", () => {
    const actions = ['generateAccessToken', 'refreshAccessToken']
    for (let actionName of actions) {
      expect(LazadaClient.hasOwnProperty(actionName)).toBe(true)
    }
  })
  test("test LazadaClient 'product' namespace action", () => {
    const actions = [
      'getProducts',
      'getCategoryTree',
      'getCategoryAttributes',
      'getBrands',
      'createProduct',
      'updateProduct',
      'migrateImage',
      'setImages',
      'updatePriceQuantity',
      'removeProduct',
    ]
    for (let actionName of actions) {
      expect(LazadaClient.hasOwnProperty(actionName)).toBe(true)
    }
  })
  test("test LazadaClient 'order' namespace action", () => {
    const actions = [
      'getOrders',
      'getOrder',
      'getOrderItems',
      'getMultipleOrderItems',
      'getFailureReasons',
      'setStatusToCanceled',
      'setStatusToReadyToShip',
      'setStatusToPackedByMarketplace',
      'setInvoiceNumber',
      'getDocument',
    ]
    for (let actionName of actions) {
      expect(LazadaClient.hasOwnProperty(actionName)).toBe(true)
    }
  })
  test("test LazadaClient 'logistics' namespace action", () => {
    const actions = ['getShipmentProviders']
    for (let actionName of actions) {
      expect(LazadaClient.hasOwnProperty(actionName)).toBe(true)
    }
  })
})
