// One-off / re-runnable image optimizer.
// Keeps every original in public/images and writes resized WebP derivatives into
// public/images/optimized (mirroring the folder layout), plus a small favicon set.
// Run with: npm run optimize:images
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const outDir = path.join(imagesDir, "optimized");
const publicDir = path.join(root, "public");

// Longest-edge caps per use. Photos are only ever shown in the lightbox (<=90vw x 75vh),
// project cards in a ~700px 4:3 frame, so these cover retina without shipping DSLR raws.
const GALLERY_MAX = 2000;
const CARD_MAX = 1400;
const HERO_MAX = 1100; // me_.png is 796x1024, so this keeps it native.

async function toWebp(src, dest, maxEdge, quality) {
  await mkdir(path.dirname(dest), { recursive: true });
  const before = (await stat(src)).size;
  await sharp(src)
    .rotate() // respect EXIF orientation
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  const after = (await stat(dest)).size;
  const kb = (n) => (n / 1024).toFixed(0);
  console.log(
    `  ${path.relative(imagesDir, src)}  ${kb(before)}KB -> ${kb(after)}KB  (${path.relative(imagesDir, dest)})`
  );
  return { before, after };
}

async function run() {
  let before = 0;
  let after = 0;
  const add = (r) => {
    before += r.before;
    after += r.after;
  };

  console.log("Gallery photos -> WebP:");
  const galleryDir = path.join(imagesDir, "Gallery");
  for (const f of await readdir(galleryDir)) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue;
    const dest = path.join(outDir, "Gallery", f.replace(/\.(jpe?g|png)$/i, ".webp"));
    add(await toWebp(path.join(galleryDir, f), dest, GALLERY_MAX, 78));
  }

  console.log("Project cards -> WebP:");
  const cards = [
    "waiki.png",
    "portfolio.png",
    "plant_detection.png",
    "accountant.png",
    "eda_housing.png",
    "gardefou-hero.png",
    "t1-injection-demo.png",
    "notes-insa-collage.png",
  ];
  for (const f of cards) {
    const dest = path.join(outDir, f.replace(/\.png$/i, ".webp"));
    add(await toWebp(path.join(imagesDir, f), dest, CARD_MAX, 80));
  }

  console.log("Hero cutout -> WebP:");
  add(await toWebp(path.join(imagesDir, "me_.png"), path.join(outDir, "me_.webp"), HERO_MAX, 82));

  console.log("Favicons (from me_icon.png):");
  const iconSrc = path.join(imagesDir, "me_icon.png");
  for (const size of [32, 64, 180]) {
    const name = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
    const dest = path.join(publicDir, name);
    await sharp(iconSrc).resize(size, size, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(dest);
    console.log(`  me_icon.png -> ${name} (${size}px, ${((await stat(dest)).size / 1024).toFixed(1)}KB)`);
  }

  console.log("Social preview card:");
  await generateOgImage();

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(`\nDerivatives total: ${mb(before)}MB originals -> ${mb(after)}MB WebP`);
}

// 1200x630 Open Graph card: hero cutout on the right, name + role on the paper canvas.
// Site tokens: paper #ffffff, ink #3f3f3f, stone #d3cec5, ash #686867, pebble #acacac.
// Text is rendered by librsvg via the SVG below; if Inter is not installed on this machine
// it falls back to a system sans, which is fine for a share card.
async function generateOgImage() {
  const W = 1200;
  const H = 630;
  const photo = await sharp(path.join(imagesDir, "me_.png"))
    .resize({ height: 600, fit: "inside" })
    .png()
    .toBuffer();
  const photoW = (await sharp(photo).metadata()).width;
  const photoLeft = W - photoW - 90;

  const svg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="90" y="300" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="700" letter-spacing="-3" fill="#3f3f3f">Théo Phan</text>
      <rect x="93" y="332" width="70" height="3" fill="#d3cec5"/>
      <text x="90" y="392" font-family="Inter, Arial, sans-serif" font-size="30" fill="#686867">CS student, INSA Rennes</text>
      <text x="90" y="434" font-family="Inter, Arial, sans-serif" font-size="30" fill="#686867">AI + Full-Stack</text>
      <text x="90" y="565" font-family="Inter, Arial, sans-serif" font-size="21" letter-spacing="3" fill="#acacac">PORTFOLIO · 2026</text>
    </svg>`,
    "utf8"
  );

  const dest = path.join(publicDir, "og-preview.png");
  await sharp({ create: { width: W, height: H, channels: 4, background: "#ffffff" } })
    .composite([
      { input: photo, left: photoLeft, top: H - 600 },
      { input: svg, left: 0, top: 0 },
    ])
    .png()
    .toFile(dest);
  console.log(`  og-preview.png (${W}x${H}, ${((await stat(dest)).size / 1024).toFixed(1)}KB)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
