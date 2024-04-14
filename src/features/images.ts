import { products } from "./products.ts";
import { downloadImage } from "../api/downloadImage.ts";
import { exists } from "@std/fs/exists";
import { join } from "@std/path/join";

const OUTPUT_DIRNAME = "out";
const IMAGES_DIRNAME = join(OUTPUT_DIRNAME, "images");

await Deno.mkdir(IMAGES_DIRNAME, { recursive: true });

console.info(`Downloading images...`);

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
      `${name} ${view}.jpeg`,
    );

    if (await exists(filename)) {
      console.debug(`Skipping since file already exists: ${name} ${view}`);
    } else {
      await downloadImage(path, filename);
    }
  }
}
