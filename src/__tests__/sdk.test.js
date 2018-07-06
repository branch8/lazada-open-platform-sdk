/**
 * @file test script for post-build code
 */

require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('src') // sdk

describe('test sdk module', () => {
  test.skip('call generateAccessToken', async () => {
    const api = new LazadaAPI(appKey, appSecret, countryCode)
    const payload = { code: '123' }
    try {
      const result = await api.generateAccessToken(payload)
      console.error(result)
    } catch (error) {
      console.error(error)
    }
  })

  test.skip('call refreshAccessToken', async () => {
    const api = new LazadaAPI(appKey, appSecret, countryCode)
    const payload = { refresh_token: '123' }
    try {
      const result = await api.refreshAccessToken(payload)
      console.error(result)
    } catch (error) {
      console.error(error)
    }
  })

  test('test invoke api functions on SDK instance', () => {
    const api = new LazadaAPI(appKey, appSecret, countryCode)
    const functionNameList = [
      // system
      'generateAccessToken',
      'refreshAccessToken',
      // logistics
      'getShipmentProviders',
      // products
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
      // orders
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

    for (const functionName of functionNameList) {
      const func = api[functionName]
      expect(func instanceof Function).toBe(true)
    }
  })
})
