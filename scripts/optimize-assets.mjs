import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const assets = [
  {
    input: "public/assets/screenshots/linkd-pos-register-devices.png",
    output: "public/assets/screenshots/linkd-pos-register-devices.webp",
    width: 1280,
    quality: 82,
  },
  {
    input: "public/assets/screenshots/linkd-inventory-search-devices.png",
    output: "public/assets/screenshots/linkd-inventory-search-devices.webp",
    width: 1280,
    quality: 82,
  },
  {
    input: "public/assets/screenshots/linkd-customers-crm-devices.png",
    output: "public/assets/screenshots/linkd-customers-crm-devices.webp",
    width: 1280,
    quality: 82,
  },
  {
    input: "public/assets/screenshots/linkd-reports-home-devices.png",
    output: "public/assets/screenshots/linkd-reports-home-devices.webp",
    width: 1280,
    quality: 82,
  },
  {
    input: "public/assets/screenshots/linkd-settings-integrations-devices.png",
    output: "public/assets/screenshots/linkd-settings-integrations-devices.webp",
    width: 1280,
    quality: 82,
  },
  {
    input: "public/assets/brand/linkd-logo-main.png",
    output: "public/assets/brand/linkd-logo-main.webp",
    width: 1200,
    quality: 88,
  },
  {
    input: "public/assets/brand/jewellink-logo-main.png",
    output: "public/assets/brand/jewellink-logo-main.webp",
    width: 1600,
    quality: 88,
  },
  {
    input: "public/assets/brand/countretail-logo-main.png",
    output: "public/assets/brand/countretail-logo-main.webp",
    width: 1400,
    quality: 88,
  },
];

await Promise.all(
  assets.map(async ({ input, output, width, quality }) => {
    await sharp(path.join(root, input))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(path.join(root, output));
  }),
);

for (const { input, output } of assets) {
  console.log(`${input} -> ${output}`);
}
