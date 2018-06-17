// usage: node examples/authenticate.js

require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
// const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaClient = require('../lib') // require transpiled js code
const lc = new LazadaClient(appKey, appSecret, countryCode)

const authCode = ''
const params = {
  code: authCode,
}
const response = lc
  .authenticate(params)
  .then(response => console.log(JSON.stringify(response, null, 4)))
  .catch(error => console.log(JSON.stringify(error, null, 4)))

/**
  # fail response
  {
    code: 'InvalidCode',
    type: 'ISP',
    message: 'Invalid authorization code',
    request_id: '{{request_id}}'
  }
  {
    "code": "IllegalAccessToken",
    "type": "ISV"
    "message": "The specified access token is invalid or expired",
    "request_id": "0b8ae2f415263703419498863",
  }
  # success response
  {
    access_token: '{{access_token}}',
    country: 'sg', // sg:Singapore, my:Malaysia, ph:Philippines, th:Thailand, id:Indonesia, vn:Vietnam
    refresh_token: '{{refresh_token}}',
    account_platform: 'seller_center',
    refresh_expires_in: 2592000,
    country_user_info: 
    [ { country: 'sg',
        user_id: '{{user_id}}',
        seller_id: '{{seller_id}}',
        short_code: '{{short_code}}' } ],
    expires_in: {{seconds}},
    account: '{{login_user_account}}',
    code: '0',
    request_id: '{{request_id}}'
  }
  */
