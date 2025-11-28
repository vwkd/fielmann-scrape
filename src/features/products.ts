import { Command, ValidationError } from "@cliffy/command";
import { join } from "@std/path/join";
import { brand, faceShape, shape, targetGroup } from "../features/filters.ts";
import { getProducts } from "../api/fetchProducts.ts";
import { parseProducts } from "./parse.ts";

const OUTPUT_DIRNAME = "out";
export const PRODUCTS_FILEPATH = join(OUTPUT_DIRNAME, "products.json");

/**
 * Options of products command
 */
export interface Options extends Attributes {
  delayMean: number;
  delayOffset: number;
}

export interface Attributes {
  brand: (keyof typeof brand)[];
  targetGroup: (keyof typeof targetGroup)[];
  shape: (keyof typeof shape)[];
  faceShape: (keyof typeof faceShape)[];
}

export default new Command()
  .description("Scrape products")
  .option("--delay-mean <delay-mean:integer>", "Mean delay", {
    default: 2000,
    value: (value: number) => {
      if (value < 0) {
        throw new ValidationError(
          `Invalid delay mean '${value}'`,
        );
      }
      return value;
    },
  })
  .option(
    "--delay-offset <delay-offset:integer>",
    "Maximum offset from mean delay",
    {
      default: 1000,
      value: (value: number) => {
        if (value < 0) {
          throw new ValidationError(
            `Invalid delay offset '${value}'`,
          );
        }
        return value;
      },
    },
  )
  .group("Filter Options")
  .option("-b, --brand <brand:string>", "Brand", {
    collect: true,
    value: (value: string, agg: string[] = []) => {
      if (!Object.keys(brand).includes(value)) {
        throw new ValidationError(`Invalid brand '${value}'`);
      }
      return [...agg, value];
    },
  })
  .option("-t, --target-group <target-group:string>", "Target group", {
    collect: true,
    value: (value: string, agg: string[] = []) => {
      if (!Object.keys(targetGroup).includes(value)) {
        throw new ValidationError(`Invalid target group '${value}'`);
      }
      return [...agg, value];
    },
  })
  .option("-s, --shape <shape:string>", "Shape of glasses", {
    collect: true,
    value: (value: string, agg: string[] = []) => {
      if (!Object.keys(shape).includes(value)) {
        throw new ValidationError(`Invalid shape '${value}'`);
      }
      return [...agg, value];
    },
  })
  .option("-f, --face-shape <face-shape:string>", "Shape of face", {
    collect: true,
    value: (value: string, agg: string[] = []) => {
      if (!Object.keys(faceShape).includes(value)) {
        throw new ValidationError(`Invalid face shape '${value}'`);
      }
      return [...agg, value];
    },
  })
  .action(fetchProducts);

/**
 * Fetch products
 *
 * @param options Options
 */
export async function fetchProducts(options: Options): Promise<void> {
  console.info(`Fetching products...`);

  await Deno.mkdir(OUTPUT_DIRNAME, { recursive: true });

  const products = await getProducts(options);

  await Deno.writeTextFile(PRODUCTS_FILEPATH, JSON.stringify(products));

  console.info(`Got ${products.length} products`);

  await parseProducts(products);
}
