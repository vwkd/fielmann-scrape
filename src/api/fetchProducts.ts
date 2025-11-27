import { delay } from "@std/async";
import { randomIntegerBetween } from "@std/random";
import { brand, faceShape, shape, targetGroup } from "../features/filters.ts";
import type { Product, ProductsByCategory } from "../types/products.ts";

const USER_AGENT = Deno.env.get("USER_AGENT");
const DELAY_STR = Deno.env.get("DELAY");
const DELAY_OFFSET_STR = Deno.env.get("DELAY_OFFSET");
const PAGE_SIZE = 24;

if (!USER_AGENT) {
  throw new Error(`Environment variable 'USER_AGENT' not set`);
} else if (!DELAY_STR) {
  throw new Error(`Environment variable 'DELAY' not set`);
} else if (!DELAY_OFFSET_STR) {
  throw new Error(`Environment variable 'DELAY_OFFSET' not set`);
}

const DELAY = Number(DELAY_STR);
const DELAY_OFFSET = Number(DELAY_OFFSET_STR);

if (Number.isInteger(DELAY) || DELAY < 0) {
  throw new Error(
    `Expected non-negative integer 'DELAY' but got '${DELAY_STR}'`,
  );
}

if (Number.isInteger(DELAY_OFFSET) || DELAY_OFFSET < 0) {
  throw new Error(
    `Expected non-negative integer 'DELAY_OFFSET' but got '${DELAY_OFFSET_STR}'`,
  );
}

interface Attributes {
  brand: (keyof typeof brand)[];
  targetGroup: (keyof typeof targetGroup)[];
  shape: (keyof typeof shape)[];
  faceShape: (keyof typeof faceShape)[];
}

/**
 * Get body for API request
 *
 * @param attributes attributes to filter by
 * @param page page number
 * @param perPage results per page
 * @returns body for API request
 */
function getBody(attributes: Attributes, page: number, perPage: number) {
  return {
    payload: {
      page,
      perPage,
      with: {
        attributes: "all",
        advancedAttributes: "all",
        categories: "all",
        variants: {
          attributes: "all",
          advancedAttributes: "all",
          lowestPriorPrice: true,
        },
        images: {
          attributes: {
            withKey: [
              "imageType",
              "imageView",
              "imageBackground",
              "imageKind",
              "imageVariantReferenceKey",
            ],
          },
        },
        priceRange: true,
        lowestPriorPrice: true,
        siblings: {
          images: {
            attributes: {
              withKey: [
                "imageType",
                "imageView",
                "imageBackground",
                "imageKind",
                "imageVariantReferenceKey",
              ],
            },
          },
          attributes: {
            withKey: [
              "category",
              "numberOfLenses",
              "colorDetail",
              "name",
              "netContent",
              "manufacturerColorCode",
              "frameColor",
              "filterCategory",
            ],
          },
          priceRange: true,
        },
      },
      category: "/brillen/",
      includeSellableForFree: true,
      where: {
        attributes: [
          {
            key: "brand",
            type: "attributes",
            values: attributes.brand,
          },
          {
            key: "targetGroup",
            type: "attributes",
            values: attributes.targetGroup,
          },
          {
            key: "shape",
            type: "attributes",
            values: attributes.shape,
          },
          {
            key: "faceShape",
            type: "attributes",
            values: attributes.faceShape,
          },
        ].filter((el) => el.values.length > 0),
        term: "",
        page,
      },
      sort: {
        name: "sortingKey",
        sortingKey: "brillen",
        direction: "asc",
      },
      pricePromotionKey: "",
      includeSoldOut: false,
    },
  };
}

/**
 * Get product details from API
 *
 * - note: delayed by delay +- random offset
 *
 * @param attributes attributes to filter by
 * @returns array of products
 */
export async function getProducts(attributes: Attributes): Promise<Product[]> {
  console.debug(`Fetching page 1/?...`);

  const productsPage = await getProductsPage(attributes, 1, PAGE_SIZE);
  const products = productsPage.products;
  const last = productsPage.pagination.last;

  // note: enters loop only if more products available
  for (let page = 2; page <= last; page += 1) {
    console.debug(`Fetching page ${page}/${last}...`);

    const delay_ms = randomIntegerBetween(
      DELAY - DELAY_OFFSET,
      DELAY + DELAY_OFFSET,
    );
    await delay(delay_ms);

    const productsPage = await getProductsPage(attributes, page, PAGE_SIZE);

    products.push(...productsPage.products);
  }

  return products;
}

async function getProductsPage(
  attributes: Attributes,
  page: number,
  perPage: number,
): Promise<ProductsByCategory> {
  const productsUrl = `https://www.fielmann.de/api/rpc/getProductsByCategory`;

  const body = getBody(attributes, page, perPage);
  const body_str = JSON.stringify(body);

  const res = await makeRequest(productsUrl, body_str);

  const productsPage: ProductsByCategory = await res.json();

  // todo: error handling

  return productsPage;
}

async function makeRequest(url: string, body: string) {
  const req = new Request(url, {
    method: "POST",
    body,
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "de",
      "content-type": "application/json",
      "x-shop-locale": "de-DE",
      "origin": "https://www.fielmann.de",
      "referer": "https://www.fielmann.de/brillen/",
      "user-agent": USER_AGENT,
    },
  });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
  }

  return res;
}
