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
  const cards = ["waiki.png", "portfolio.png", "plant_detection.png", "accountant.png", "eda_housing.png"];
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

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(`\nDerivatives total: ${mb(before)}MB originals -> ${mb(after)}MB WebP`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
