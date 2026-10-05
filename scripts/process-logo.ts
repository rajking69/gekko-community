/**
 * Convert the source `gekko logo.jpg` (red mark on white) into transparent
 * PNGs at the sizes the site actually consumes.
 *
 * Algorithm for the alpha channel:
 *   alpha = 255 - min(R, G, B)
 *
 * White (255, 255, 255) → alpha 0 (fully transparent)
 * Pure red (255, 0, 0)   → alpha 255 (fully opaque)
 * Anti-aliased pink edges land somewhere in between, which preserves the
 * smooth silhouette against any background colour.
 *
 * Run with:  npx tsx scripts/process-logo.ts
 */
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = path.resolve(process.cwd(), '..', 'assets', 'brand', 'gekko-logo.jpg');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'brand');

const SIZES = [64, 128, 192, 256, 512, 1024] as const;

async function buildTransparent(): Promise<{ data: Buffer; width: number; height: number }> {
  // 1. Load + trim the white margin so the silhouette is centred.
  // 2. Extract raw RGB pixels.
  // 3. Compute alpha = 255 - min(R, G, B) per pixel.
  // 4. Join channels back together as RGBA PNG.
  const trimmed = sharp(SOURCE).trim({ background: { r: 255, g: 255, b: 255 }, threshold: 10 });
  const { data: rgb, info } = await trimmed
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.width * info.height;
  const rgba = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    const r = rgb[i * 3] ?? 0;
    const g = rgb[i * 3 + 1] ?? 0;
    const b = rgb[i * 3 + 2] ?? 0;
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = 255 - Math.min(r, g, b);
  }

  const out = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  return { data: out, width: info.width, height: info.height };
}

async function main() {
  console.log(`Source: ${SOURCE}`);
  console.log(`Output: ${OUT_DIR}`);

  const master = await buildTransparent();
  console.log(`Trimmed master: ${master.width} × ${master.height}`);

  // Master copy — keep at native resolution for any future use.
  await sharp(master.data)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'gekko-logo.png'));

  // Padded square versions for icons / OG. Square-pad so the silhouette
  // is centred inside a 1:1 frame with transparent margin.
  for (const size of SIZES) {
    const pad = Math.max(master.width, master.height);
    const padded = await sharp(master.data)
      .extend({
        top: Math.floor((pad - master.height) / 2),
        bottom: Math.ceil((pad - master.height) / 2),
        left: Math.floor((pad - master.width) / 2),
        right: Math.ceil((pad - master.width) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT_DIR, `gekko-logo-${size}.png`));
    console.log(`  ${size}×${size} → ${padded.size.toLocaleString()} bytes`);
  }

  // Dedicated favicon + apple-icon. Both render on a dark brand square so
  // the red logo stays legible on light browser chrome.
  const APP_DIR = path.resolve(process.cwd(), 'src', 'app');
  const BG = { r: 3, g: 5, b: 10, alpha: 1 } as const; // matches --color-bg-void
  const accent = '<rect x="0" y="0" width="100%" height="100%" fill="#03050a"/>';

  async function paint(size: number, outPath: string) {
    // Resize the master to fit inside ~70% of the icon canvas, then composite
    // onto a same-size dark square.
    const inner = Math.round(size * 0.7);
    const logo = await sharp(master.data)
      .resize(inner, inner, {
        fit: 'inside',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    await sharp({
      create: { width: size, height: size, channels: 4, background: BG },
    })
      .composite([{ input: logo, gravity: 'centre' }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`  icon ${size}×${size} → ${outPath}`);
  }

  await paint(64, path.join(APP_DIR, 'icon.png'));
  await paint(180, path.join(APP_DIR, 'apple-icon.png'));

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
