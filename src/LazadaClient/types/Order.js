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
  | 'lost_by_3pl' 
  | 'damaged_by_3pl' 
  | 'failed_delivery' 
  | 'returned'
  | 'shipped'
  | 'failed'
