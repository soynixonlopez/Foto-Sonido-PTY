/**
 * Convierte en transparente el color de fondo que toca los bordes del PNG
 * (típico rectángulo negro), sin borrar negro interior no conectado al borde.
 *
 * Uso: node scripts/logo-make-transparent.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const logoPath = path.join(__dirname, "../public/images/logos/logoFotoSonido.png");
const TOLERANCE = 18;

async function main() {
  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const stride = 4;
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  const matches = (i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    return (
      Math.abs(r - bgR) <= TOLERANCE &&
      Math.abs(g - bgG) <= TOLERANCE &&
      Math.abs(b - bgB) <= TOLERANCE
    );
  };

  const pix = (x, y) => (y * w + x) * stride;
  const seen = new Uint8Array(w * h);
  const q = [];

  const pushEdge = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const p = y * w + x;
    if (seen[p]) return;
    const i = pix(x, y);
    if (!matches(i)) return;
    seen[p] = 1;
    q.push([x, y]);
  };

  for (let x = 0; x < w; x++) {
    pushEdge(x, 0);
    pushEdge(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    pushEdge(0, y);
    pushEdge(w - 1, y);
  }

  let qi = 0;
  while (qi < q.length) {
    const [x, y] = q[qi++];
    const i = pix(x, y);
    data[i + 3] = 0;
    const n = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (const [nx, ny] of n) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const p = ny * w + nx;
      if (seen[p]) continue;
      const ni = pix(nx, ny);
      if (!matches(ni)) continue;
      seen[p] = 1;
      q.push([nx, ny]);
    }
  }

  const out = await sharp(Buffer.from(data), {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

  fs.writeFileSync(logoPath, out);
  console.log("Logo con transparencia guardado:", logoPath, w, "x", h);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
