import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public/og.png");
const posPath = path.join(
  root,
  "public/assets/screenshots/linkd-pos-register-devices.png",
);
const inventoryPath = path.join(
  root,
  "public/assets/screenshots/linkd-inventory-search-devices.png",
);
const logoPath = path.join(root, "public/assets/brand/linkd-logo-main.png");

const width = 1200;
const height = 630;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baseSvg() {
  const chips = ["POS", "Inventory", "Accounts", "Security"];
  const chipWidths = [66, 118, 110, 105];
  const chipColors = ["#2f7ed8", "#16827a", "#a97828", "#17213a"];
  const chipSvg = chips
    .map((chip, index) => {
      const x =
        72 + chipWidths.slice(0, index).reduce((total, item) => total + item + 10, 0);

      return `
        <rect x="${x}" y="458" width="${chipWidths[index]}" height="44" rx="22" fill="${chipColors[index]}"/>
        <text x="${x + chipWidths[index] / 2}" y="486" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="800" fill="#ffffff">${escapeXml(chip)}</text>
      `;
    })
    .join("");

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.55" stop-color="#f1f7fb"/>
          <stop offset="1" stop-color="#e5f0f7"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.88" cy="0.18" r="0.7">
          <stop offset="0" stop-color="#d6ecff" stop-opacity="0.98"/>
          <stop offset="0.7" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#17213a" flood-opacity="0.18"/>
        </filter>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#17213a" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <path d="M0 530 C170 486 286 604 455 542 C595 490 709 565 858 524 C1015 480 1115 509 1200 462 L1200 630 L0 630 Z" fill="#dcebf6" opacity="0.62"/>
      <rect x="46" y="48" width="1108" height="534" rx="34" fill="#ffffff" opacity="0.48"/>
      <text x="72" y="182" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="850" fill="#2f7ed8" letter-spacing="0">LUXURY JEWELRY POS SOFTWARE</text>
      <text x="72" y="262" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="850" fill="#17213a" letter-spacing="0">Jewelry POS</text>
      <text x="72" y="342" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="850" fill="#17213a" letter-spacing="0">that connects</text>
      <text x="72" y="422" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="850" fill="#17213a" letter-spacing="0">the store.</text>
      ${chipSvg}
      <text x="72" y="548" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" fill="#596b82">JewelLink and CountRetail ready</text>
      <g filter="url(#shadow)">
        <rect x="596" y="86" width="542" height="374" rx="24" fill="#ffffff"/>
      </g>
      <rect x="614" y="104" width="506" height="338" rx="15" fill="#eef4f8" stroke="#d6e1ec" stroke-width="2"/>
      <g filter="url(#softShadow)">
        <rect x="666" y="424" width="390" height="134" rx="18" fill="#ffffff"/>
      </g>
      <rect x="684" y="442" width="354" height="98" rx="12" fill="#eef4f8" stroke="#d6e1ec" stroke-width="2"/>
    </svg>
  `);
}

async function roundedImage(inputPath, imageWidth, imageHeight, radius, resizeOptions = {}) {
  const image = await sharp(inputPath)
    .resize(imageWidth, imageHeight, {
      fit: "cover",
      position: "center",
      ...resizeOptions,
    })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${imageWidth}" height="${imageHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="${imageWidth}" height="${imageHeight}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );

  return sharp(image).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

const logo = await sharp(logoPath)
  .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 })
  .resize({ width: 250, fit: "inside" })
  .png()
  .toBuffer();
const pos = await roundedImage(posPath, 506, 338, 15);
const inventory = await roundedImage(inventoryPath, 354, 98, 12, {
  position: "top",
});

await sharp(baseSvg())
  .composite([
    { input: logo, left: 68, top: 68 },
    { input: pos, left: 614, top: 104 },
    { input: inventory, left: 684, top: 442 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
console.log(`Generated ${path.relative(root, outputPath)} ${metadata.width}x${metadata.height}`);
