/**
 * @flow
 */

export type ProductFilter =
  | 'all'
  | 'live'
  | 'inactive'
  | 'deleted'
  | 'image-missing'
  | 'pending'
  | 'rejected'
  | 'sold-out'

/** UpdateProduct payload and parameter */

export type UpdateProductSKU = {
  Sku: {
    SellerSku: string, // A unique identifier for the product within the Seller Center instance that is to be added to the system. This identifier is usually freely assigned. Harmonized identifiers, such as UPC or EAN can be set via ProductId. Mandatory
    active?: boolean, // One of the following values: 'true' or 'false'. Optional
    price?: number | string, // decimal | The product price. Not really a Double, but a Decimal. Optional
    quantity?: number, // integer | The current level of inventory for this product. Optional
    special_price?: number | string, // decimal | The (hopefully reduced) price for the product while it is on sale. If special_price is specified, either special_from_date or special_to_date must be given; vice versa, if at least one of special_from_date or special_to_date is specified. Not really a Double, but a Decimal. Optional
    special_from_date?: string, // datetime | Time and date when the product goes on sale. If passed in, special_price becomes mandatory. The value of 'Time' is accepted in intervals of 15 mins (For ex: 2017-07-15 18:23 will be converted to 2017-07-15 18:15).
    special_to_date?: string, // datetime | Time and date when the product sale ends. If passed in, special_price becomes mandatory. The value of 'Time' is accepted in intervals of 15 mins (For ex: 2017-07-15 18:23 will be converted to 2017-07-15 18:15).
    package_height?: string, // Package height. Optional
    package_length?: string, // Package length. Optional
    package_width?: string, // Package width. Optional
    package_weight?: string, // Package weight. Optional
    package_content?: string, // Package Content. Optional
    Images?: Array<{
      Image: string,
    }>, // Contains most 8 images URL. Optional
  },
}

export type UpdateProductAttributes = {
  name?: string, // Name of the product as shown to the customers. Optional
  description?: string, // Description of the product, as shown to the customers (6 to 25000 characters). Embedding certain HTML tags is allowed, but must be escaped as character data (see below). Optional
  short_description?: string, // Highlights of the product. Optional
  brand?: string, // Brand name of the product. Optional
  model?: string, // Model name of the product. Optional
  warranty?: string, // The warranty time for the product. Optional
  warranty_type?: string, // The warranty type of the product. Optional
  color_family?: string, // Color family. Optional
  // ...: string, // more other attributes defined in the PrimaryCategory. Optional
}

export type UpdateProductDataNode = {
  PrimaryCategory?: number, // The ID of the primary category for this product. To get the ID of all categories, call GetCategoryTree. Optional
  SPUId?: number, // The ID of the SPU. Optional.
  Attributes?: UpdateProductAttributes, // All common attributes of products. Optional
  Skus: Array<UpdateProductSKU>, // An array contains at least one SKU. Mandatory
}

export type UpdateProductPayload = {
  Product: UpdateProductDataNode, // The product data node. Mandatory
}
