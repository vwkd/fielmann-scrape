const USER_AGENT = Deno.env.get("USER_AGENT");

if (!USER_AGENT) {
  throw new Error(`Environment variable 'USER_AGENT' not set`);
}

/**
 * Download image from CDN and save to file
 *
 * @param path path of image
 * @param filepath path to save image
 */
export async function downloadImage(
  path: string,
  filepath: string,
): Promise<void> {
  const imageUrl = `https://fim-live.cdn.aboutyou.cloud/${path}`;

  const req = new Request(imageUrl, {
    headers: {
      "accept": "image/jpeg,*/*",
      "referer": "https://www.fielmann.de/",
      "user-agent": USER_AGENT,
    },
  });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(`Error ${res.status} - ${res.statusText}`);
  }

  if (!res.body) {
    throw new Error(`No body`);
  }

  const contentType = res.headers.get("content-type");

  if (contentType != "image/jpeg") {
    throw new Error(`Unknown content type ${contentType}`);
  }

  return Deno.writeFile(filepath, res.body);
}
