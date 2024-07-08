import { type Product, type ProductsByCategory } from "../types/products.ts";

import { delay, random_number } from "../utils.ts";

const USER_AGENT = Deno.env.get("USER_AGENT");
const DELAY = Deno.env.get("DELAY");
const DELAY_OFFSET = Deno.env.get("DELAY_OFFSET");
const PAGE_SIZE = 24;

if (!USER_AGENT) {
  throw new Error(`Environment variable 'USER_AGENT' not set`);
} else if (!DELAY) {
  throw new Error(`Environment variable 'DELAY' not set`);
} else if (!DELAY_OFFSET) {
  throw new Error(`Environment variable 'DELAY_OFFSET' not set`);
}

interface Attributes {
  brand: number[];
  targetGroup: number[];
  shape: number[];
  faceShape: number[];
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

    await delay(random_number(DELAY, DELAY_OFFSET));

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

  return fetch(req);
}
