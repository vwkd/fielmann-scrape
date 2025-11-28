import { Command } from "@cliffy/command";
import { exists } from "@std/fs/exists";
import { join } from "@std/path/join";
import { PRODUCTS_FILEPATH } from "./products.ts";
import { downloadImage } from "../api/downloadImage.ts";

const OUTPUT_DIRNAME = "out";
const IMAGES_DIRNAME = join(OUTPUT_DIRNAME, "images");

export default new Command()
  .description("Download images")
  .action(downloadImages);

/**
 * Download images
 */
export async function downloadImages(): Promise<void> {
  console.info(`Downloading images...`);

  const products = JSON.parse(await Deno.readTextFile(PRODUCTS_FILEPATH));

  await Deno.mkdir(IMAGES_DIRNAME, { recursive: true });

  for (const product of products) {
    const brand = product.attributes.brand.values.label;
    const model = product.attributes.modelName.values.label;
    const frameColor = product.attributes.frameColor.values.label;
    const ean = product.variants[0].attributes.ean.values.value;

    const name = `${brand} ${model} ${frameColor} ${ean}`;

    const images = product.images;

    for (const [index, image] of images.entries()) {
      const path = image.hash;
      const imageView = image.attributes.imageView?.values.label;

      if (!imageView) {
        console.debug(`Skipping because not an image: ${name} ${path}`);
        continue;
      }

      const previousElements = images.slice(0, index);
      const duplicateNumber = previousElements.filter((e) =>
        e.attributes.imageView?.values.label === imageView
      ).length;

      const view = `${imageView}` +
        (duplicateNumber > 0 ? `_${duplicateNumber}` : "");

      const filename = join(
        IMAGES_DIRNAME,
        `${name.replaceAll("/", "-")} ${view}.jpeg`,
      );

      if (await exists(filename)) {
        console.debug(`Skipping since file already exists: ${name} ${view}`);
      } else {
        await downloadImage(path, filename);
      }
    }
  }
}
