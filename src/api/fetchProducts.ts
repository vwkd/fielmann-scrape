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
 * @param minPrice minimum price
 * @param maxPrice maximum price
 * @returns body for API request
 */
function getBody(
  attributes: Attributes,
  page: number,
  minPrice?: number,
  maxPrice?: number,
) {
  return {
    payload: {
      with: {
        attributes: "all",
        advancedAttributes: "all",
        categories: "all",
        variants: {
          attributes: "all",
          advancedAttributes: "all",
          lowestPriorPrice: true,
        },
        images: "all",
        priceRange: true,
        lowestPriorPrice: true,
        siblings: {
          images: "all",
          attributes: "all",
          advancedAttributes: "all",
          priceRange: true,
          variants: {
            attributes: "all",
            advancedAttributes: "all",
            lowestPriorPrice: true,
          },
        },
      },
      includeSellableForFree: true,
      categoryId: 1,
      where: {
        attributes: [
          ...(Object.entries(attributes) as [
            keyof Attributes,
            Attributes[keyof Attributes],
          ][])
            .filter(([_, values]) => values.length > 0)
            .map(([key, values]) => ({
              type: "attributes",
              key: key,
              values: values.map((v) => filterMap[key][v]),
            })),
          {
            type: "attributes",
            key: "page",
            values: [
              page,
            ],
          },
        ],
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        term: "",
      },
      perPage: 24,
      page,
      sort: {
        name: "sortingKey",
        sortingKey: "Brille",
        direction: "asc",
      },
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
  const { delayMean, delayOffset, minPrice, maxPrice, ...attributes } = options;

  console.debug(`Fetching page 1/?...`);

  const productsPage = await getProductsPage(attributes, 1, minPrice, maxPrice);
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

    const productsPage = await getProductsPage(
      attributes,
      page,
      minPrice,
      maxPrice,
    );

    products.push(...productsPage.products);
  }

  return products;
}

async function getProductsPage(
  attributes: Attributes,
  page: number,
  minPrice?: number,
  maxPrice?: number,
): Promise<ProductsByCategory> {
  const productsUrl = `https://www.fielmann.de/api/rpc/getProductsByCategory`;

  const body = getBody(attributes, page, minPrice, maxPrice);
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
