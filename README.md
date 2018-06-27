# Nodejs wrapper for Lazada Open Platform API
[![Build Status](https://travis-ci.org/branch8/lazada-open-platform-sdk.svg?branch=master)](https://travis-ci.org/branch8/lazada-open-platform-sdk)

| ! WIP project

# Usage

1. Install sdk

    ```shell
    [~/project/dir] $ npm install lazada-open-platform-sdk
    ```

1. Require `LazadaAPI` class

    ```js
    import LazadaAPI from 'lazada-open-platform-sdk'
    // OR
    const LazadaAPI = require('lazada-open-platform-sdk')
    ```

1. Instantiate a LazadaAPI Object

    ```js
    /**
     * LazadaAPI class constructor
     * @param {string} appKey
     * @param {string} appSecret
     * @param {Venture} countryCode @ref: 'src/LazadaClient/constants.js'
     * countryCode should be one of the following
     * | 'SINGAPORE'
     * | 'THAILAND'
     * | 'MALAYSIA'
     * | 'VIETNAM'
     * | 'PHILIPPINES'
     * | 'INDONESIA'
     * @param {string?} accessToken require for some API
     */
    const aLazadaAPI = new LazadaAPI(appKey, appSecret, 'SINGAPORE')
    // OR
    const accessToken = 'some_access_token'
    const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, 'SINGAPORE', accessToken)
    ```

  1. Call API action with proper parameters  

      ```js
      // all API action return promise
      aLazadaAPI
        .generateAccessToken({ code: 'auth_code' })
        .then(response => {
          const { access_token } = response // JSON data from Lazada's API
        })
      // for API action that require authorization, you must set the accessToken first
      aLazadaAPI.accessToken = 'some_access_token'
      aLazadaAPI
        .getShipmentProviders()
        .then(response => {
          // JSON data from Lazada's API
        })
      ```
  1. For available API actions, check the [support table](#api-support). For proper API request parameters, check [Lazada's offcial documentation](#lazada-api-doc) and source code located in `src/LazadaClient/<namespace>`

# API Support

| Order                          | status             |
| ------------------------------ | ------------------ |
| getDocument                    | :heavy_check_mark: |
| getFailureReasons              | :heavy_check_mark: |
| getMultipleOrderItems          | :heavy_check_mark: |
| getOrder                       | :heavy_check_mark: |
| getOrderItems                  | :heavy_check_mark: |
| getOrders                      | :heavy_check_mark: |
| setInvoiceNumber               | :heavy_check_mark: |
| setStatusToCanceled            | :heavy_check_mark: |
| setStatusToPackedByMarketplace | :heavy_check_mark: |
| setStatusToReadyToShip         | :heavy_check_mark: |

---

| Product               | status             |
| --------------------- | ------------------ |
| createProduct         | :heavy_check_mark: |
| getBrands             | :heavy_check_mark: |
| getCategoryAttributes | :heavy_check_mark: |
| getCategoryTree       | :heavy_check_mark: |
| getProducts           | :heavy_check_mark: |
| getQcStatus           | :no_entry_sign:    |
| getResponse           | :no_entry_sign:    |
| migrateImage          | :heavy_check_mark: |
| migrateImages         | :no_entry_sign:    |
| removeProduct         | :heavy_check_mark: |
| setImages             | :heavy_check_mark: |
| updatePriceQuantity   | :heavy_check_mark: |
| updateProduct         | :heavy_check_mark: |
| uploadImage           | :no_entry_sign:    |

---

| Finance               | status          |
| --------------------- | --------------- |
| getPayoutStatus       | :no_entry_sign: |
| getTransactionDetails | :no_entry_sign: |

---

| Logistics            | status             |
| -------------------- | ------------------ |
| getShipmentProviders | :heavy_check_mark: |

---

| Seller       | status          |
| ------------ | --------------- |
| getSeller    | :no_entry_sign: |
| updateSeller | :no_entry_sign: |
| updateUser   | :no_entry_sign: |

---

| System              | status             |
| ------------------- | ------------------ |
| generateAccessToken | :heavy_check_mark: |
| refreshAccessToken  | :heavy_check_mark: |

---

| DataMoat            | status          |
| ------------------- | --------------- |
| dataMoatBatchLog    | :no_entry_sign: |
| dataMoatComputeRisk | :no_entry_sign: |
| dataMoatLogin       | :no_entry_sign: |
| dataMoatOrder       | :no_entry_sign: |

# Development

## Tools

- node - runtime
- babel - js transpiler
- flow - type checker
- jest - test runner
- eslint - linter
- vscode - recommended text editor

## Convention

1. sdk variables: `camelCase`  
1. api variables: `snake_case` or `PascalCase`

## File structure

```
src/
├── LazadaAPI           // LazadaAPI: top level controller class
│   └── index.js        
├── LazadaClient        // LazadaClient: namespace seperated API actions
│   ├── index.js
│   ├── logistics.js
│   ├── order.js
│   ├── product.js
│   └── system.js
├── LazadaRequest       // LazadaRequest: responsible for network request
│   ├── index.js
│   └── signature       // logic for signing API request
│       └── index.js
├── __tests__           // all tests located here
└── index.js            // a.k.a. main.c
```

# Design

```js
const APIRequest = {
  appKey:      ":require",
  appSecret:   ":require",
  baseURL:     ":require" // Protocol (default: https) + Gateway (location specific)
  HttpAction:  "GET OR POST",  // API specific
  apiPath:     "action/path",  // API specific
  accessToken: ":optional",    // API specific
  payload: {}   // API specific
};
```

# Reference
## Lazada API Doc
https://open.lazada.com/doc/api.htm