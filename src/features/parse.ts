import { join } from "@std/path/join";
import { entries } from "../types/utils.ts";
import type {
  Attribute,
  AttributeMultiple,
  Product,
} from "../types/products.ts";

const OUTPUT_DIRNAME = "out";
const PRODUCTS_FILEPATH = join(OUTPUT_DIRNAME, "productsParsed.json");

/**
 * Get attribute names and values
 *
 * - extracts `label` property, since nicely formatted value
 * - except if `ean`, extracts `value` property
 * - if multiple, concatenates with comma
 *
 * @param attributes object of attributes with name and nested structure
 * @returns object of attributes with name and value
 */
function getAttributes<T extends Record<string, Attribute | AttributeMultiple>>(
  attributes: T,
): Record<keyof T, string> {
  const res = {} as Record<keyof T, string>;

  for (const [name, attribute] of entries(attributes)) {
    if (attribute.multiSelect === true) {
      res[name] = attribute.values.map((v) => v.label).join(", ");
    } else {
      // note: exception for `ean` attribute
      if (name === "ean") {
        res[name] = attribute.values.value;
      } else {
        res[name] = attribute.values.label;
      }
    }
  }

  return res;
}

/**
 * Parse products
 */
export async function parseProducts(products: Product[]): Promise<void> {
  console.info(`Parsing products...`);

  const productsParsed = [];

  for (const product of products) {
    // id
    // -
    // isActive
    // -
    // isSoldOut
    // -
    // isNew
    // -
    // createdAt
    // -
    // updatedAt
    // -
    // indexedAt
    // -
    // firstLiveAt
    // -
    // masterKey
    // -
    // referenceKey
    // -

    // attributes
    const attributes = getAttributes(product.attributes);

    // advancedAttributes
    // -

    const lensesArray: string[] = [];
    for (
      const lens of product.advancedAttributes.rxCountryIndexAvailability.values
    ) {
      const country = lens.fieldSet[0][0].value;

      if (country !== "de") {
        continue;
      }

      const lensId = lens.fieldSet[0][1].value;

      lensesArray.push(lensId);
    }
    const lenses = lensesArray.join(", ");

    // images
    // -

    // variants
    for (const variant of product.variants) {
      // id
      // -
      // referenceKey
      // -

      // attributes
      const variantAttributes = getAttributes(variant.attributes);

      // advancedAttributes
      // -
      // firstLiveAt
      // -
      // createdAt
      // -
      // updatedAt
      // -
      // stock
      // -

      // price
      const price = variant.price.withTax / 100;

      // lowestPriorPrice
      // -
      // // note
      // -
      // customData
      // -

      productsParsed.push({
        ...attributes,
        ...variantAttributes,
        price,
        lenses,
      });
    }

    // priceRange
    // -
    // lowestPriorPrice
    // -
    // siblings
    // -
    // categories
    // -
    // customData
    // -
  }

  await Deno.writeTextFile(PRODUCTS_FILEPATH, JSON.stringify(productsParsed));
}
