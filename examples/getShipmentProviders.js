// usage: 1. npm run build 2. node examples/getShipmentProviders.js

require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../lib') // require transpiled js code
const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

aLazadaAPI
  .getShipmentProviders()
  .then(res => {
    console.log(
      '[getShipmentProviders] resolve\n',
      JSON.stringify(res, null, 4),
    )
  })
  .catch(err => {
    console.log('[getShipmentProviders] reject\n', JSON.stringify(err, null, 4))
  })
