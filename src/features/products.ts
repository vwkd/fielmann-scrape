import { getProducts } from "../api/fetchProducts.ts";
import { exists } from "@std/fs/exists";
import { join } from "@std/path/join";
import { type Product } from "../types/products.ts";

const OUTPUT_DIRNAME = "out";
const PRODUCTS_FILEPATH = join(OUTPUT_DIRNAME, "products.json");

const BRAND: number[] = JSON.parse(Deno.env.get("BRAND") || "[]");
const TARGET_GROUP: number[] = JSON.parse(
  Deno.env.get("TARGET_GROUP") || "[]",
);
const SHAPE: number[] = JSON.parse(Deno.env.get("SHAPE") || "[]");
const FACE_SHAPE: number[] = JSON.parse(Deno.env.get("FACE_SHAPE") || "[]");

let products: Product[];

await Deno.mkdir(OUTPUT_DIRNAME, { recursive: true });

console.info(`Fetching products...`);

if (await exists(PRODUCTS_FILEPATH)) {
  console.debug(`Skipping since file already exists`);

  products = JSON.parse(await Deno.readTextFile(PRODUCTS_FILEPATH));
} else {
  products = await getProducts({
    brand: BRAND,
    targetGroup: TARGET_GROUP,
    shape: SHAPE,
    faceShape: FACE_SHAPE,
  });

  await Deno.writeTextFile(PRODUCTS_FILEPATH, JSON.stringify(products));
}

console.info(`Got ${products.length} products`);

export { products };
