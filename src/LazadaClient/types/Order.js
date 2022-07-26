/**
 * @flow
 */
export type OrderStatus =
  | 'unpaid'
  | 'pending'
  | 'packed'
  | 'canceled'
  | 'ready_to_ship'
  | 'delivered'
  | 'returned'
  | 'shipped'
  | 'failed'
