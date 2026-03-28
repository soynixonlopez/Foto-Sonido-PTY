/**
 * Recorta márgenes uniformes (p. ej. negro) del logo PNG.
 * Uso: node scripts/trim-logo.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const logoPath = path.join(__dirname, "../public/images/logos/logoFotoSonido.png");

async function main() {
  const buf = await sharp(logoPath).trim({ threshold: 12 }).png().toBuffer();
  fs.writeFileSync(logoPath, buf);
  const meta = await sharp(logoPath).metadata();
  console.log("Logo recortado:", meta.width, "x", meta.height);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
