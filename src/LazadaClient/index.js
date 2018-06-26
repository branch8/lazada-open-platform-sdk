// @flow
'use strict'

import SystemActions from './system'
import ProductActions from './product'
import OrderActions from './order'
import LogisticsActions from './logistics'

module.exports = {
  ...SystemActions,
  ...ProductActions,
  ...OrderActions,
  ...LogisticsActions,
}
