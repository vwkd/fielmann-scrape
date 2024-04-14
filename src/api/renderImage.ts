import { type PhotoRender } from "../types/fittingbox.ts";

const USER_AGENT = Deno.env.get("USER_AGENT");

if (!USER_AGENT) {
  throw new Error(`Environment variable 'USER_AGENT' not set`);
}

/**
 * Render on face with FittingBox API
 *
 * - note: image is uploaded to FittingBox
 * - beware: silently fails if image is too big, works with 600x800 around 200KB
 *
 * @param frameSku virtual try on reference
 * @param imageB64Data base64-encoded image of face
 * @returns base64-encoded image of rendered image
 */
export async function renderImage(
  frameSku: string,
  imageB64Data: string,
): Promise<string> {
  const apiKey = "HBuv5J9a6CEn7YSKhv2DEw51nWmY1AQOM2lI3Lch";
  const currentTime = (new Date()).toISOString().replaceAll(/[:.Z-]/g, "");

  const renderUrl =
    `https://renderservice-v5.fittingbox.com/photorender/310/fitmix_'${apiKey}_${currentTime}?productName=Fitmix`;

  const body = {
    frames: [
      {
        frameSku,
      },
    ],
    imageB64Data,
    id: "testPhotoRenderV310",
    productParams: {
      apiKey,
      licenseId: "licenseId",
      restApiUrl: "https://product-api.fittingbox.com/",
    },
  };

  const req = new Request(renderUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Accept": "*/*",
      "content-type": "application/json",
      "Origin": "https://static.fittingbox.com/",
      "Referer": "https://static.fittingbox.com/",
      "User-Agent": USER_AGENT,
    },
  });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(`Error ${res.status} - ${res.statusText}`);
  }

  if (!res.body) {
    throw new Error(`No body`);
  }

  const photoRender: PhotoRender = await res.json();

  if (photoRender.error) {
    throw new Error(`Got error ${JSON.stringify(photoRender.error)}`);
  }

  const outputImageB64 = photoRender.frames[0].outputImageB64;

  if (!outputImageB64) {
    throw new Error(`No output image. Try a smaller input image.`);
  }

  return outputImageB64;
}
