import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public/assets/advertising");

const screenshotDir = path.join(root, "public/assets/screenshots");
const brandDir = path.join(root, "public/assets/brand");

const outputs = {
  stack: path.join(outputDir, "linkd-luxury-management-stack.webp"),
  frames: path.join(outputDir, "linkd-feature-frames.webp"),
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textLines(lines, x, startY, options = {}) {
  const {
    size = 42,
    weight = 850,
    fill = "#17213a",
    lineHeight = Math.round(size * 1.16),
    anchor = "start",
  } = options;

  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${startY + index * lineHeight}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`,
    )
    .join("");
}

async function roundedImage(inputPath, width, height, radius, resizeOptions = {}) {
  const image = await sharp(inputPath)
    .resize(width, height, {
      fit: "cover",
      position: "center",
      ...resizeOptions,
    })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );

  return sharp(image).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function logo(inputPath, width) {
  return sharp(inputPath)
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 })
    .resize({ width, fit: "inside" })
    .png()
    .toBuffer();
}

function stackSvg() {
  const cards = [
    ["Linkd", "Operations", "POS / inventory / accounts"],
    ["JewelLink", "Relationships", "CRM / clienteling / training"],
    ["CountRetail", "Intelligence", "Traffic / Vision AI / analytics"],
  ];
  const cardSvg = cards
    .map((card, index) => {
      const x = 130 + index * 430;
      const color = ["#2f7ed8", "#16827a", "#a97828"][index];

      return `
        <rect x="${x}" y="754" width="360" height="132" rx="18" fill="#ffffff" stroke="#d6e1ec" stroke-width="2"/>
        <rect x="${x + 24}" y="778" width="12" height="84" rx="6" fill="${color}"/>
        <text x="${x + 54}" y="806" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="850" fill="${color}" letter-spacing="0">${escapeXml(card[1])}</text>
        <text x="${x + 54}" y="842" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="850" fill="#17213a">${escapeXml(card[0])}</text>
        <text x="${x + 54}" y="875" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="720" fill="#596b82">${escapeXml(card[2])}</text>
      `;
    })
    .join("");

  return Buffer.from(`
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.55" stop-color="#f4f8fb"/>
          <stop offset="1" stop-color="#e6f1f8"/>
        </linearGradient>
        <filter id="deep" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="34" stdDeviation="32" flood-color="#17213a" flood-opacity="0.18"/>
        </filter>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#17213a" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="1600" height="1000" fill="url(#bg)"/>
      <rect x="56" y="54" width="1488" height="892" rx="42" fill="#ffffff" opacity="0.56"/>
      <text x="96" y="140" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="850" fill="#2f7ed8">FULL LUXURY JEWELRY MANAGEMENT</text>
      ${textLines(["Linkd + JewelLink", "+ CountRetail"], 96, 230, { size: 72, lineHeight: 82 })}
      <text x="96" y="428" font-family="Inter, Arial, sans-serif" font-size="29" font-weight="720" fill="#596b82">Operations. Relationships. Intelligence.</text>
      <g filter="url(#deep)">
        <rect x="760" y="118" width="680" height="454" rx="26" fill="#ffffff"/>
      </g>
      <rect x="782" y="140" width="636" height="410" rx="18" fill="#eef4f8" stroke="#d6e1ec" stroke-width="2"/>
      <g filter="url(#soft)">
        <rect x="620" y="490" width="390" height="168" rx="22" fill="#ffffff"/>
        <rect x="1040" y="492" width="380" height="168" rx="22" fill="#ffffff"/>
      </g>
      <text x="648" y="538" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" fill="#16827a">RELATIONSHIP LAYER</text>
      <text x="1068" y="540" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" fill="#a97828">INTELLIGENCE LAYER</text>
      ${cardSvg}
    </svg>
  `);
}

function featureFramesSvg() {
  const frames = [
    ["POS", "Counter workspace", "Client / items / tender", "4", "#2f7ed8"],
    ["Customers", "CRM-ready record", "Profile / segments / finance", "5", "#16827a"],
    ["Services", "Repair flow", "Intake / status / pickup", "3", "#a97828"],
    ["Inventory", "Case-to-vault control", "Items / transfers / scans", "9", "#2f7ed8"],
    ["Reports", "Owner reports", "Sales / inventory / KPI", "59", "#16827a"],
    ["Integrations", "Management stack", "Linkd / JewelLink / CountRetail", "3", "#a97828"],
  ];

  const frameSvg = frames
    .map((frame, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 82 + col * 486;
      const y = 382 + row * 286;

      return `
        <g filter="url(#cardShadow)">
          <rect x="${x}" y="${y}" width="434" height="254" rx="20" fill="#ffffff"/>
        </g>
        <rect x="${x}" y="${y}" width="434" height="54" rx="20" fill="${frame[4]}"/>
        <rect x="${x}" y="${y + 34}" width="434" height="28" fill="${frame[4]}"/>
        <text x="${x + 24}" y="${y + 36}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" fill="#ffffff">${escapeXml(frame[0])}</text>
        <text x="${x + 24}" y="${y + 104}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="850" fill="#17213a">${escapeXml(frame[1])}</text>
        <text x="${x + 24}" y="${y + 138}" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="720" fill="#596b82">${escapeXml(frame[2])}</text>
        <rect x="${x + 336}" y="${y + 78}" width="62" height="58" rx="12" fill="#eef4f8"/>
        <text x="${x + 367}" y="${y + 116}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="900" fill="${frame[4]}">${escapeXml(frame[3])}</text>
        <rect x="${x + 24}" y="${y + 170}" width="116" height="34" rx="17" fill="#eef4f8"/>
        <rect x="${x + 150}" y="${y + 170}" width="118" height="34" rx="17" fill="#e6f4f2"/>
        <rect x="${x + 278}" y="${y + 170}" width="120" height="34" rx="17" fill="#f6eedf"/>
        <text x="${x + 82}" y="${y + 193}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" fill="#17213a">Ready</text>
        <text x="${x + 209}" y="${y + 193}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" fill="#17213a">Review</text>
        <text x="${x + 338}" y="${y + 193}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" fill="#17213a">Connect</text>
      `;
    })
    .join("");

  return Buffer.from(`
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#17213a"/>
          <stop offset="1" stop-color="#244a72"/>
        </linearGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#07111f" flood-opacity="0.26"/>
        </filter>
      </defs>
      <rect width="1600" height="1000" fill="url(#bg)"/>
      <text x="80" y="120" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="850" fill="#cde7ff">LINKD FEATURE FRAMES</text>
      ${textLines(["Six product frames", "for jewelry teams."], 80, 198, { size: 64, lineHeight: 72, fill: "#ffffff" })}
      <text x="80" y="330" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="720" fill="#c9d8e8">POS, customers, services, inventory, reports, and integrations without private records.</text>
      ${frameSvg}
    </svg>
  `);
}

await fs.mkdir(outputDir, { recursive: true });

const pos = await roundedImage(
  path.join(screenshotDir, "linkd-pos-register-devices.png"),
  636,
  410,
  18,
);
const jewellinkLogo = await logo(path.join(brandDir, "jewellink-logo-main.png"), 270);
const countretailLogo = await logo(path.join(brandDir, "countretail-logo-main.png"), 260);

await sharp(stackSvg())
  .composite([
    { input: pos, left: 782, top: 140 },
    { input: jewellinkLogo, left: 658, top: 560 },
    { input: countretailLogo, left: 1098, top: 570 },
  ])
  .webp({ quality: 88, effort: 6 })
  .toFile(outputs.stack);

await sharp(featureFramesSvg())
  .webp({ quality: 88, effort: 6 })
  .toFile(outputs.frames);

for (const output of Object.values(outputs)) {
  const metadata = await sharp(output).metadata();
  console.log(`${path.relative(root, output)} ${metadata.width}x${metadata.height}`);
}
