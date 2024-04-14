import { products } from "./products.ts";
import { renderImage } from "../api/renderImage.ts";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import { exists } from "@std/fs/exists";
import { join } from "@std/path/join";

const OUTPUT_DIRNAME = "out";
const RENDERS_DIRNAME = join(OUTPUT_DIRNAME, "renders");

const FACE_PIC_FILEPATH = Deno.env.get("FACE_PIC_FILEPATH");

if (!FACE_PIC_FILEPATH) {
  throw new Error(`Environment variable 'FACE_PIC_FILEPATH' not set`);
}

await Deno.mkdir(RENDERS_DIRNAME, { recursive: true });

console.info(`Generating renders...`);

const facePic = await Deno.readFile(FACE_PIC_FILEPATH);
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
