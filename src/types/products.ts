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
  masterKey: string;
  referenceKey: string;
  attributes: Attributes;
  advancedAttributes: AdvancedAttributes;
  images: Image[];
  variants: Variant[];
  priceRange: PriceRange;
  lowestPriorPrice: LowestPriorPrice;
  categories: Category[][];
  customData: Record<string, never>;
}

export interface Attributes {
  addressResponsiblePerson?: Attribute;
  ageGroup: AttributeMultiple;
  availabilityEcom: AttributeMultiple;
  baseColor: AttributeMultiple;
  baseColorLenses?: Attribute;
  baseLensMaterial?: Attribute;
  baseMaterial?: Attribute;
  baseTempleMaterial?: Attribute;
  boutique?: Attribute;
  brand: Attribute;
  brandLogo: Attribute;
  bridgeType?: Attribute;
  category: AttributeMultiple;
  categorySpecification?: AttributeMultiple;
  contactResponsiblePerson?: Attribute;
  contactTypeManufacturer?: Attribute;
  contactTypeResponsiblePerson?: Attribute;
  countryOfOrigin?: Attribute;
  description: Attribute;
  designLabel?: Attribute;
  displayCategory: Attribute;
  faceShape: AttributeMultiple;
  fielmannColor: Attribute;
  fielmannFrameShape: Attribute;
  fielmannLensColor?: Attribute;
  fielmannLensMaterial?: Attribute;
  fielmannMaterial: Attribute;
  fielmannTempleColor?: Attribute;
  fielmannTempleMaterial?: Attribute;
  filterCategory?: Attribute;
  frameColor?: Attribute;
  frameColorPattern?: AttributeMultiple;
  frameMaterialSustainability?: Attribute;
  frameType: Attribute;
  gender: AttributeMultiple;
  glazeability?: Attribute;
  hasCompliancePdf?: Attribute;
  hasManualPdf?: Attribute;
  height?: Attribute;
  hingeType: Attribute;
  isQuantityChangeDisabled?: Attribute;
  legalManufacturer?: Attribute;
  length?: Attribute;
  lensCharacter?: AttributeMultiple;
  mainCategory: Attribute;
  manufacturerAddress?: Attribute;
  manufacturerColorCode: Attribute;
  manufacturerContact?: Attribute;
  manufacturerName?: Attribute;
  manufacturerNamePublic?: Attribute;
  modelCode?: Attribute;
  modelName: Attribute;
  name: Attribute;
  new?: Attribute;
  nickelFree?: Attribute;
  nosePads?: Attribute;
  packingTypeProduct?: Attribute;
  preislagentyp?: AttributeMultiple;
  productClassification?: Attribute;
  productGroups?: Attribute;
  productNameLong: Attribute;
  productType?: AttributeMultiple;
  promotion: Attribute;
  quantityPerUnit?: Attribute;
  recommendationRefUpsell?: AttributeMultiple;
  recommendationRefXsell?: AttributeMultiple;
  responsiblePersonEu?: Attribute;
  rimType?: Attribute;
  salesStatus: Attribute;
  sapMaterial?: Attribute;
  sapPriceBandCategoryProduct?: Attribute;
  searchColorEcom?: Attribute;
  sellableIn?: AttributeMultiple;
  shape?: Attribute;
  subBrand?: Attribute;
  subCategory?: Attribute;
  subCategoryFinal: Attribute;
  suitableForSports?: Attribute;
  supplierName?: Attribute;
  sustainability?: Attribute;
  tags?: AttributeMultiple;
  targetGroup: AttributeMultiple;
  templeType?: Attribute;
  virtualTryOnReady?: Attribute;
  weatherConditions?: Attribute;
  width?: Attribute;
}

export interface Attribute {
  id: number;
  key: string;
  label: string;
  type: "detailsTable" | "";
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
  accountableManufacturer?: AdvancedAttribute;
  displayName: AdvancedAttribute;
  legacyMasterIdAdv?: AdvancedAttribute;
  legacyProductIdAdv?: AdvancedAttribute;
  marketingName?: AdvancedAttribute;
  productName: AdvancedAttribute;
  responsibleImporter?: AdvancedAttribute;
  rxCountryIndexAvailability: AdvancedAttribute;
  shortDescriptionFormatted?: AdvancedAttribute;
  siblings?: Siblings;
  virtualTryOnReference?: AdvancedAttribute;
}

export interface AdvancedAttribute {
  id: number;
  key: string;
  label: string;
  type: string;
  values: AdvancedAttributeValue<ValueSet>[];
}

export interface AdvancedAttributeValue<T> {
  fieldSet: T[][];
  groupSet: [];
}

export interface ValueSet {
  value: string;
}

export interface Siblings {
  id: number;
  key: "siblings";
  label: "siblings";
  type: string;
  values: AdvancedAttributeValue<SiblingsValueSet>[];
}

export interface SiblingsValueSet {
  productId: number;
  images: [];
  isSoldOut: boolean;
}

export interface Image {
  hash: string;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  imageView?: Attribute;
  middlewareReferenceSource: Attribute;
  ownersManual?: Attribute;
  complianceDeclaration?: Attribute;
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
  customData: Record<string, never>;
}

export interface VariantAttributes {
  additionalDeliveryTime?: Attribute;
  baseColorVariant?: Attribute;
  bridgeWidth: Attribute;
  distributionChannel?: AttributeMultiple;
  ean: Attribute;
  fielmannColorVariant?: Attribute;
  frameBridge?: Attribute;
  frameSize?: Attribute;
  glassesWidth: Attribute;
  headSize?: Attribute;
  headWidth?: Attribute;
  isSale?: Attribute;
  isSellableForFree?: Attribute;
  lensHeight?: Attribute;
  lensWidth: Attribute;
  sku: Attribute;
  taxRate?: Attribute;
  templeLength: Attribute;
  totalWidth?: Attribute;
  valueAddedTax: Attribute;
}

export interface VariantAdvancedAttributes {
  akeneoEanAdv?: AdvancedAttribute;
  displayNameVariant?: AdvancedAttribute;
  eanFielmannInStore?: AdvancedAttribute;
  ecomEan?: AdvancedAttribute;
  legacyVariantIdAdv?: AdvancedAttribute;
  plannedLaunchDate?: AdvancedAttribute;
  priceReferenceKeyAdv: AdvancedAttribute;
  recommendedRetailPrice?: AdvancedAttribute;
}

export interface Stock {
  supplierId: number;
  warehouseId: number;
  quantity: number;
  isSellableWithoutStock: boolean;
  expectedAvailabilityAt: null;
}

export interface Price {
  currencyCode: "EUR";
  withTax: number;
  withoutTax: number;
  recommendedRetailPrice: null;
  tax: Tax;
  appliedReductions: AppliedReduction[];
  reference?: Reference;
}

export interface Tax {
  vat: Vat;
}

export interface Vat {
  amount: number;
  rate: number;
}

export interface AppliedReduction {
  category: "sale";
  type: "relative";
  amount: Amount;
}

export interface Amount {
  relative: number;
  absoluteWithTax: number;
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
  total: number;
  perPage: number;
  page: number;
  first: number;
  prev: number;
  next: number;
  last: number;
}
