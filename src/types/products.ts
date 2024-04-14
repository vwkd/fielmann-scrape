/**
 * Generated with https://app.quicktype.io/
 *
 * for response from https://www.fielmann.de/api/getProductsByCategory
 *
 * - manually simplified
 * - not complete
 */

export interface ProductsByCategory {
  products: Product[];
  pagination: Pagination;
}

export interface Product {
  id: number;
  isActive: boolean;
  isSoldOut: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
  indexedAt: Date;
  firstLiveAt: Date;
  // todo: integer as string?
  masterKey: string;
  // todo: integer as string?
  referenceKey: string;
  attributes: Attributes;
  advancedAttributes: AdvancedAttributes;
  images: Image[];
  variants: Variant[];
  priceRange: PriceRange;
  lowestPriorPrice: LowestPriorPrice;
  siblings: Sibling[];
  categories: Category[][];
  // note: empty object
  customData: Record<string | number | symbol, never>;
}

// todo: should allow both single or multiple attributes `Attribute | AttributeMultiple`?
// but must ensure is same for all products in search
export interface Attributes {
  gender: AttributeMultiple;
  hingeType: Attribute;
  // todo: should allow multiple?
  rimType: Attribute;
  category: AttributeMultiple;
  tags?: AttributeMultiple;
  bridgeType: Attribute;
  productType?: AttributeMultiple;
  targetGroup: AttributeMultiple;
  // todo: should allow multiple?
  brand: Attribute;
  // todo: should allow multiple?
  shape: Attribute;
  modelName: Attribute;
  modelCode: Attribute;
  recommendationRefUpsell: AttributeMultiple;
  preislagentyp?: AttributeMultiple;
  length?: Attribute;
  sellableIn: AttributeMultiple;
  name: Attribute;
  productGroups: Attribute;
  productNameLong: Attribute;
  faceShape: AttributeMultiple;
  categorySpecification?: AttributeMultiple;
  searchColorEcom: Attribute;
  baseColor: AttributeMultiple;
  brandLogo: Attribute;
  frameColor: Attribute;
  description: Attribute;
  width?: Attribute;
  salesStatus: Attribute;
  height?: Attribute;
  // todo: should allow multiple?
  sapMaterial: Attribute;
  isQuantityChangeDisabled: Attribute;
  ageGroup: AttributeMultiple;
  mainCategory: Attribute;
  manufacturerNamePublic: Attribute;
  countryOfOrigin: Attribute;
  virtualTryOnReady: Attribute;
  subCategory: Attribute;
  manufacturerColorCode: Attribute;
  new?: Attribute;
  sustainability?: Attribute;
  hasCompliancePdf?: Attribute;
}

export interface Attribute {
  id: number;
  key: string;
  label: string;
  type: string;
  multiSelect: false;
  values: AttributeValue;
}

export interface AttributeMultiple {
  id: number;
  key: string;
  label: string;
  type: string;
  multiSelect: true;
  values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  label: string;
  value: string;
}

export interface AdvancedAttributes {
  rxCountryIndexAvailability: AdvancedAttribute;
  productName: AdvancedAttribute;
  siblings: AdvancedAttribute<SiblingsValueSet>;
  virtualTryOnReference: AdvancedAttribute;
  legacyMasterIdAdv?: AdvancedAttribute;
  legacyProductIdAdv?: AdvancedAttribute;
}

export interface AdvancedAttribute<T = ValueSet> {
  id: number;
  key: string;
  label: string;
  type: string;
  values: AdvancedAttributeValue<T>[];
}

export interface AdvancedAttributeValue<T> {
  fieldSet: T[][];
  groupSet: [];
}

export interface ValueSet {
  value: string;
}

export interface SiblingsValueSet {
  productId: number;
  isSoldOut: boolean;
}

export interface Image {
  hash: string;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  imageView?: Attribute;
}

export interface Variant {
  id: number;
  referenceKey: string;
  attributes: VariantAttributes;
  advancedAttributes: VariantAdvancedAttributes;
  firstLiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
  stock: Stock;
  price: Price;
  lowestPriorPrice: LowestPriorPrice;
  // note: empty object
  customData: Record<string | number | symbol, never>;
}

export interface VariantAdvancedAttributes {
  akeneoEanAdv?: AdvancedAttribute;
  priceReferenceKeyAdv: AdvancedAttribute;
  legacyVariantIdAdv?: AdvancedAttribute;
}

export interface VariantAttributes {
  templeLength: Attribute;
  frameBridge: Attribute;
  bridgeWidth: Attribute;
  ean: Attribute;
  isSellableForFree?: Attribute;
  lensWidth: Attribute;
  // todo: should allow multiple?
  headWidth: Attribute;
  valueAddedTax: Attribute;
  glassesWidth: Attribute;
}

export interface Stock {
  supplierId: number;
  warehouseId: number;
  quantity: number;
  isSellableWithoutStock: boolean;
}

export interface Price {
  currencyCode: "EUR";
  withTax: number;
  withoutTax: number;
  recommendedRetailPrice: null;
  tax: Tax;
  appliedReductions: [];
  reference?: Reference;
}

export interface Tax {
  vat: Vat;
}

export interface Vat {
  amount: number;
  rate: number;
}

export interface Reference {
  withoutTax: number;
  withTax: number;
  size: number;
  unit: "piece";
}

export interface LowestPriorPrice {
  withTax: null;
  relativeDifferenceToPrice: null;
}

export interface PriceRange {
  min: Price;
  max: Price;
}

export interface Sibling {
  id: number;
  isActive: boolean;
  isSoldOut: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
  indexedAt: Date;
  firstLiveAt: Date;
  masterKey: string;
  referenceKey: string;
  attributes: SiblingAttributes;
  images: SiblingImage[];
  priceRange: PriceRange;
  // note: empty object
  customData: Record<string | number | symbol, never>;
}

export interface SiblingAttributes {
  manufacturerColorCode: Attribute;
  frameColor: Attribute;
  name: Attribute;
}

export interface SiblingImage {
  hash: string;
  attributes: ImageAttributes;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  categoryUrl: string;
  categoryHidden: boolean;
  categoryProperties: [];
}

export interface Pagination {
  current: number;
  // beware: doesn't seem to be reliable, is +1 on first page compared to later pages
  total: number;
  perPage: number;
  page: number;
  first: number;
  prev: number;
  next: number;
  last: number;
}
