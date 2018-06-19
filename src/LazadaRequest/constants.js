// @flow

module.exports = Object.freeze({
  RESPONSE: {
    SUCCESS: {
      CODE: '0',
    },
    ERROR: {
      API_PLATFORM_ERROR: 'SYSTEM',
      BUSINESS_DATA_ERROR: 'ISV',
      BACKEND_SERVICE_ERROR: 'ISP',
    },
  },
  PROTOCOL: {
    HTTPS: 'HTTPS',
    HTTP: 'HTTP',
  },
  HTTP_ACTION: {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
  },
})
