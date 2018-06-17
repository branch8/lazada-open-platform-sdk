// usage: node examples/getShipmentProviders.js

require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaClient = require('../lib') // require transpiled js code
const lc = new LazadaClient(appKey, appSecret, countryCode)

const params = {
  access_token: accessToken,
}

lc.shipment
  .getShipmentProviders(params)
  .then(res => {
    console.log('[getShipmentProviders] resolve', JSON.stringify(res, null, 4))
  })
  .catch(err => {
    console.log('[getShipmentProviders] reject', JSON.stringify(err, null, 4))
  })
