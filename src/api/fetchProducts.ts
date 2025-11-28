import { delay } from "@std/async";
import { randomIntegerBetween } from "@std/random";
import type { Product, ProductsByCategory } from "../types/products.ts";
import type { Attributes, Options } from "../features/products.ts";
import {
  brand,
  faceShape,
  glassesWidth,
  headWidth,
  rimType,
  sapMaterial,
  searchColorEcom,
  shape,
  targetGroup,
  virtualTryOnReady,
} from "../features/filters.ts";

const PAGE_SIZE = 24;

const filterMap = {
  brand,
  faceShape,
  glassesWidth,
  headWidth,
  rimType,
  sapMaterial,
  searchColorEcom,
  shape,
  targetGroup,
  virtualTryOnReady,
} as const;

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
        values: (Object.entries(attributes) as [
          keyof Attributes,
          Attributes[keyof Attributes],
        ][])
          .filter(([_, values]) => values.length > 0)
          .map(([key, values]) => ({
            key: key,
            type: "attributes",
            values: values.map((v) => filterMap[key][v]),
          })),
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
 * @param options attributes to filter by
 * @returns array of products
 */
export async function getProducts(options: Options): Promise<Product[]> {
  const { delayMean, delayOffset, ...attributes } = options;

  console.debug(`Fetching page 1/?...`);

  const productsPage = await getProductsPage(attributes, 1, PAGE_SIZE);
  const products = productsPage.products;
  const last = productsPage.pagination.last;

  // note: enters loop only if more products available
  for (let page = 2; page <= last; page += 1) {
    console.debug(`Fetching page ${page}/${last}...`);

    const delay_ms = randomIntegerBetween(
      delayMean - delayOffset,
      delayMean + delayOffset,
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
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1",
    },
  });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
  }

  return res;
}
