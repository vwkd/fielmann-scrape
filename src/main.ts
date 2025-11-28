import { Command } from "@cliffy/command";
import productsCommand from "./features/products.ts";
import imagesCommand from "./features/images.ts";
import renderCommand from "./features/render.ts";

await new Command()
  .name("fielmann-scrape")
  .version("0.0.1")
  .description("Scrape products from Fielmann")
  .command("products", productsCommand)
  .command("images", imagesCommand)
  .command("render", renderCommand)
  .parse();
