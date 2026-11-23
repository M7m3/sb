// Converts any PNG or JPEG under /public to WebP, then you can delete the originals.
// Run: node scripts/convert-images.mjs        (quality 80 for photos, 90 for logos, alpha kept)
// SVGs and .ico files are left alone.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

let count = 0;
for (const file of walk("public")) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
  const out = file.slice(0, -ext.length) + ".webp";
  const isLogo = /logo|icon/i.test(basename(file));
  let img = sharp(file);
  if (/hero-desktop/i.test(file)) img = img.resize({ width: 2400, withoutEnlargement: true });
  if (/hero-mobile/i.test(file)) img = img.resize({ width: 1200, withoutEnlargement: true });
  await img.webp({ quality: isLogo ? 90 : 80, alphaQuality: 100 }).toFile(out);
  console.log(`${file} ${kb(file)}  ->  ${out} ${kb(out)}`);
  count++;
}
console.log(count ? `Converted ${count} file(s). Update references, then delete the originals.` : "No PNG or JPEG files found in /public. Nothing to convert.");
