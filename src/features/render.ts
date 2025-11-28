import { Command } from "@cliffy/command";
import { exists } from "@std/fs/exists";
import { join } from "@std/path/join";
import { PRODUCTS_FILEPATH } from "./products.ts";
import { renderImage } from "../api/renderImage.ts";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";

const OUTPUT_DIRNAME = "out";
const RENDERS_DIRNAME = join(OUTPUT_DIRNAME, "renders");

/**
 * Options of render command
 */
export interface Options {
  /**
   * Path to file with face picture
   *
   * - beware: need to adapt `facePicBase64` if not `image/jpeg` filetype!
   */
  pic: string;
}

export default new Command()
  .description("Generate renders")
  .option("-p, --pic <path:file>", "Face pic filepath", { required: true })
  .action(generateRenders);

/**
 * Generate renders
 *
 * @param options Options
 */
export async function generateRenders(options: Options): Promise<void> {
  console.info(`Generating renders...`);

  const products = JSON.parse(await Deno.readTextFile(PRODUCTS_FILEPATH));

  await Deno.mkdir(RENDERS_DIRNAME, { recursive: true });

  const facePic = await Deno.readFile(options.pic);
  const facePicBase64 = "data:image/jpeg;base64," + encodeBase64(facePic);

  for (const product of products) {
    const brand = product.attributes.brand.values.label;
    const model = product.attributes.modelName.values.label;
    const frameColor = product.attributes.frameColor.values.label;
    const ean = product.variants[0].attributes.ean.values.value;

    const name = `${brand} ${model} ${frameColor} ${ean}`;

    const frameSku =
      product.advancedAttributes.virtualTryOnReference.values[0].fieldSet[0][0]
        .value;

    // note: still has `frameSKU` even if not `virtualTryOnReady`, so ignore it
    // const isRenderable = product.attributes.virtualTryOnReady.values.label === "true";
    if (!frameSku) {
      console.debug(`Skipping because not renderable: ${name}`);
      continue;
    }

    const filename = join(
      RENDERS_DIRNAME,
      `${name}.jpeg`,
    );

    if (await exists(filename)) {
      console.debug(`Skipping since file already exists ${name}`);
    } else {
      const renderBase64 = await renderImage(frameSku, facePicBase64);

      const b64 = renderBase64.split(",")[1];

      await Deno.writeFile(filename, decodeBase64(b64));
    }
  }
}
