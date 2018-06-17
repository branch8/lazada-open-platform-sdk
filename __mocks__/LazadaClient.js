'use strict'

const faker = require('faker')

const LazadaClient = {}

/** API ENDPOINT **/

/** Auth **/

LazadaClient.authenticate = params => Promise.resolve({})

/** PRODUCTS ENDPOINT **/

LazadaClient.products = {}

LazadaClient.products.getProducts = payload => {
  const MAX_ITEM = 1337
  const { offset, limit } = payload
  const productFactory = (offset, limit) => {
    const n = offset + limit <= MAX_ITEM ? limit : MAX_ITEM - offset
    const products = []
    for (let i = 0; i < n; i += 1) {
      const id = offset + i
      products.push({
        primary_category: faker.random.number(),
        attributes: {
          name: '',
        },
        skus: [
          {
            Status: '',
            Available: 2,
            Url: '',
            Images: ['http://123.pic', '', ''],
            SellerSku: 'SellerSku',
            price: 12,
            special_to_date: faker.date.recent().toISOString(),
            special_from_date: faker.date.past().toISOString(),
            special_to_time: faker.date.future().toISOString(),
            special_from_time: faker.date.past().toISOString(),
          },
        ],
        item_id: id,
      })
    }
    return products
  }
  return Promise.resolve({
    code: '0',
    request_id: faker.random.uuid().split('-')[0],
    data: {
      total_products: MAX_ITEM,
      products: productFactory(offset, limit),
    },
  })
}
LazadaClient.products.getCategoryTree = payload => Promise.resolve({})
LazadaClient.products.getCategoryAttributes = payload => Promise.resolve({})
LazadaClient.products.getBrands = payload => Promise.resolve({})
LazadaClient.products.createProduct = payload => Promise.resolve({})
LazadaClient.products.updateProduct = payload => {
  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    return Promise.resolve({
      code: '0',
      data: {},
      request_id: '0000',
    })
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/product/update',
        payload: payload,
      },
      response: {
        code: '30',
        type: 'ISP',
        message: 'E030: The request URL is not complete.',
        request_id: '0000',
      },
    })
  }
}
LazadaClient.products.migrateImage = payload => {
  const request_id = faker.random.alphaNumeric() + faker.random.number()
  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    const width = faker.random.number(640)
    const height = faker.random.number(640)
    const category = 'migrate'
    const randomize = true
    const https = true
    return Promise.resolve({
      code: '0',
      data: {
        image: {
          hash_code: faker.random.uuid(),
          url: faker.image.imageUrl(width, height, category, randomize, https),
        },
      },
      request_id,
    })
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/image/migrate',
        payload: payload,
      },
      response: {
        code: '301',
        type: 'ISP',
        message: 'E301: Migrate Image Failed',
        request_id,
      },
    })
  }
}
LazadaClient.products.setImages = payload => {
  const request_id = faker.random.alphaNumeric() + faker.random.number()
  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    return Promise.resolve({
      code: '0',
      data: {},
      request_id,
    })
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/images/set',
        payload: payload,
      },
      response: {
        code: '504',
        type: 'ISP',
        message: 'E504: Set product Image failed',
        request_id,
      },
    })
  }
}
LazadaClient.products.updatePriceQuantity = payload => {
  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    return Promise.resolve({
      code: '0',
      data: {},
      request_id: '0000',
    })
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/product/price_quantity/update',
        payload: payload,
      },
      response: {
        code: '501',
        type: 'ISP',
        message: 'E501: Update product failed.',
        request_id: '0000',
      },
    })
  }
}
LazadaClient.products.removeProduct = payload => Promise.resolve({})

/** SALES ORDER ENDPOINT **/

LazadaClient.orders = {}
LazadaClient.orders.getOrders = payload =>
  Promise.resolve({
    data: {
      count: 1,
      orders: [
        {
          voucher_platform: 0,
          voucher: 0,
          order_number: 5944314048302,
          voucher_seller: 0,
          created_at: '2018-05-17 09:23:36 +0800',
          voucher_code: '',
          gift_option: false,
          customer_last_name: '',
          updated_at: '2018-05-17 09:35:17 +0800',
          promised_shipping_times: '',
          price: '0.60',
          national_registration_number: '',
          payment_method: 'MIXEDCARD',
          customer_first_name: 'G*****************1',
          shipping_fee: 0,
          branch_number: '',
          tax_code: '',
          items_count: 1,
          delivery_info: '',
          statuses: ['delivered'],
          address_billing: {
            country: 'Singapore',
            address3: 'S*******e',
            address2: '',
            city: 'Singapore',
            address1: '6*******************************0',
            phone2: '',
            last_name: '',
            phone: '65******59',
            customer_email: '',
            post_code: '644669',
            address5: '6****9',
            address4: 'S*******e',
            first_name: 'Henky Gunawan',
          },
          extra_attributes: '',
          order_id: 5944314048302,
          gift_message: 'This is gift message',
          remarks: 'This is remarks',
          address_shipping: {
            first_name: 'First',
            last_name: 'Last',
            customer_email: 'customer@email.com',
            address1: 'shipping_address1',
            address2: 'shipping_address2',
            address3: 'shipping_address3',
            address4: 'shipping_address4',
            address5: 'shipping_address5',
            post_code: 'XX123',
            city: 'shipping_city',
            country: 'shipping_country',
            phone: '12345678',
            phone2: '87654321',
          },
        },
      ],
    },
    code: '0',
    request_id: '0b86d3cf15260308183834927',
  })
LazadaClient.orders.getOrder = payload => Promise.resolve({})
LazadaClient.orders.getOrderItems = payload =>
  Promise.resolve({
    code: '0',
    data: [
      {
        paid_price: 0.6,
        product_main_image:
          'https://sg-live-02.slatic.net/original/c1d4543528bbde487d1654ae76e185e6.jpg',
        tax_amount: 0,
        reason: '',
        product_detail_url:
          'https://www.lazada.sg/-i213858083-s323917929.html?urlFlag=true&mp=1',
        promised_shipping_time: '',
        purchase_order_id: '',
        shipping_type: 'Dropshipping',
        created_at: '2018-05-17 09:23:36 +0800',
        voucher_code: '',
        package_id: '',
        variation: '',
        updated_at: '2018-05-17 09:35:17 +0800',
        purchase_order_number: '',
        currency: 'SGD',
        shipping_provider_type: 'digital',
        sku: '835439',
        invoice_number: '1604355944314048302',
        shop_sku: '213858083_SGAMZ-323917929',
        is_digital: 1,
        item_price: 0.6,
        shipping_service_cost: 0,
        tracking_code_pre: '',
        tracking_code: '',
        shipping_amount: 0,
        order_item_id: 5944314248302,
        reason_detail: '',
        shop_id: 'James Shop 2',
        return_status: '',
        name: 'Phantom game [AFTER RELEASE] DONT BUY',
        shipment_provider: '',
        voucher_amount: 0,
        digital_delivery_info: 'gamestore.tester1@razer.com',
        extra_attributes: '',
        order_id: 5944314048302,
        status: 'delivered',
      },
    ],
    request_id: '0000',
  })
LazadaClient.orders.getMultipleOrderItems = payload =>
  Promise.resolve({
    code: '0',
    data: [
      {
        order_number: 5942339948302,
        order_id: 5942339948302,
        order_items: [
          {
            paid_price: 0.6,
            product_main_image:
              'https://sg-live-02.slatic.net/original/53c88f6592a817418a2b762a8536dca1.jpg',
            tax_amount: 0,
            reason: '',
            product_detail_url:
              'https://www.lazada.sg/-i206803194-s311484853.html?urlFlag=true&mp=1',
            promised_shipping_time: '',
            purchase_order_id: '',
            shipping_type: 'Dropshipping',
            created_at: '2018-05-17 10:25:49 +0800',
            voucher_code: '',
            package_id: '',
            variation: '',
            updated_at: '2018-05-17 10:27:13 +0800',
            purchase_order_number: '',
            currency: 'SGD',
            shipping_provider_type: 'digital',
            sku: '830691',
            invoice_number: '6801915942339948302',
            shop_sku: '206803194_SGAMZ-311484853',
            is_digital: 1,
            item_price: 0.6,
            shipping_service_cost: 0,
            tracking_code_pre: '',
            tracking_code: '',
            shipping_amount: 0,
            order_item_id: 5942340148302,
            reason_detail: '',
            shop_id: 'James Shop 2',
            return_status: '',
            name: 'Phantom Game [Released] DONT BUY',
            shipment_provider: '',
            voucher_amount: 0,
            digital_delivery_info: 'gamestore.tester1@razer.com',
            extra_attributes: '',
            order_id: 5942339948302,
            status: 'delivered',
          },
        ],
      },
      {
        order_number: 5944314048302,
        order_id: 5944314048302,
        order_items: [
          {
            paid_price: 0.6,
            product_main_image:
              'https://sg-live-02.slatic.net/original/c1d4543528bbde487d1654ae76e185e6.jpg',
            tax_amount: 0,
            reason: '',
            product_detail_url:
              'https://www.lazada.sg/-i213858083-s323917929.html?urlFlag=true&mp=1',
            promised_shipping_time: '',
            purchase_order_id: '',
            shipping_type: 'Dropshipping',
            created_at: '2018-05-17 09:23:36 +0800',
            voucher_code: '',
            package_id: '',
            variation: '',
            updated_at: '2018-05-17 09:35:17 +0800',
            purchase_order_number: '',
            currency: 'SGD',
            shipping_provider_type: 'digital',
            sku: '835439',
            invoice_number: '1604355944314048302',
            shop_sku: '213858083_SGAMZ-323917929',
            is_digital: 1,
            item_price: 0.6,
            shipping_service_cost: 0,
            tracking_code_pre: '',
            tracking_code: '',
            shipping_amount: 0,
            order_item_id: 5944314248302,
            reason_detail: '',
            shop_id: 'James Shop 2',
            return_status: '',
            name: 'Phantom game [AFTER RELEASE] DONT BUY',
            shipment_provider: '',
            voucher_amount: 0,
            digital_delivery_info: 'gamestore.tester1@razer.com',
            extra_attributes: '',
            order_id: 5944314048302,
            status: 'delivered',
          },
        ],
      },
    ],
    request_id: '0000',
  })
LazadaClient.orders.getFailureReasons = payload => Promise.resolve({})
LazadaClient.orders.setStatusToCanceled = payload => {
  return faker.random.boolean()
    ? Promise.resolve({
        success: true,
        code: '0',
        request_id: '0b8ae2f415272346913644502',
      })
    : Promise.reject({
        meta: {
          apiPath: '/order/cancel',
          payload: payload,
        },
        response: {
          code: '20',
          type: 'ISP',
          message: 'E020: 5944314048302 Invalid Order Item ID',
          request_id: '0b858e4515272347422505425',
        },
      })
}
LazadaClient.orders.setStatusToReadyToShip = payload => {
  /**
   * Sample payload
   * { access_token: '50000001036p1xqb87nTDJSZwpfZddv3MV0ClhQl2iRsDl3B18ebc05e4CbhF',
      delivery_type: 'dropship',
      shipping_provider: 'LAZOPTest',
      order_item_ids: '[5807241610524]',
      tracking_number: 'TCK-22623' }
   */
  /**
   * Sample response data
   *  {
        order_item_id: '123456',
        purchase_order_id: '567890',
        purchase_order_number: 'ABC-123456',
      },
   */
  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    const response = {
      code: '0',
      data: {},
      request_id: '0ba2887315178178017221014',
    }
    const { order_item_ids } = payload
    const orderItemIds = JSON.parse(order_item_ids)
    response.data.order_items = orderItemIds.map(orderItemId => ({
      order_item_id: orderItemId,
      purchase_order_id: '000000',
      purchase_order_number: 'ABC-123456',
    }))
    return Promise.resolve(response)
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/order/rts',
        payload,
      },
      response: {
        code: '20',
        type: 'ISV',
        message: 'E020: %s Invalid Order Item ID'.replace(
          '%s',
          payload.order_item_ids,
        ),
        request_id: '0ba2887315172940728551014',
      },
    })
  }
}

LazadaClient.orders.setStatusToPackedByMarketplace = payload => {
  /**
   * { data: 
       [ { order_item_id: 5947713907850,
           tracking_number: '',
           shipment_provider: 'DHL Express',
           package_id: 'OP09381056984625' } ],
      code: '0',
      request_id: '0be6fdb615266395111427187' }
   */

  /**
   * Sample payload object
   * { access_token: '50000001036p1xqb87nTDJSZwpfZddv3MV0ClhQl2iRsDl3B18ebc05e4CbhF',
   * shipping_provider: 'Schaden - Barton',
   * delivery_type: 'dropship',
   * order_item_ids: '[54797,18820,30077,99163,59195]' }
   */

  const shouldResponseSuccessful = faker.random.boolean()
  if (shouldResponseSuccessful) {
    const response = {
      code: '0',
      data: {},
      request_id: '0ba2887315178178017221014',
    }
    const { order_item_ids, shipping_provider } = payload
    const orderItemIds = JSON.parse(order_item_ids)
    const trackingNumber = faker.random.boolean()
      ? 'TCK-' + faker.random.number()
      : undefined
    response.data.order_items = orderItemIds.map(orderItemId => ({
      order_item_id: orderItemId,
      tracking_number: trackingNumber,
      shipment_provider: shipping_provider, // ! shipment_provider <-> shipping_provider
      package_id: 'OP08601008107178',
    }))
    return Promise.resolve(response)
  } else {
    return Promise.reject({
      meta: {
        apiPath: '/order/pack',
        payload,
      },
      response: {
        code: '6',
        type: 'ISP',
        message: '[3pl not supported, or 3pl is blank!]',
        request_id: '0be6fdce15277387849955064',
      },
    })
  }
}

LazadaClient.orders.setInvoiceNumber = payload => Promise.resolve({})
LazadaClient.orders.getDocument = payload => Promise.resolve({})

/** SHIPMENT ENDPOINT **/

LazadaClient.shipment = {}
LazadaClient.shipment.getShipmentProviders = payload =>
  Promise.resolve({
    data: {
      shipment_providers: [
        {
          name: 'LAZOPTest_MOCK',
          cod: 1,
          is_default: 0,
          api_integration: 0,
        },
        {
          name: 'Seller Own Fleet_MOCK',
          cod: 0,
          is_default: 0,
          api_integration: 0,
        },
      ],
    },
    code: '0',
    request_id: '0be6fdce15277373407313571',
  })

// constructor
module.exports = function(appKey, appSecret, countryCode) {
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

  return LazadaClient
}
