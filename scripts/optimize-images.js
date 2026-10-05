const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'images');
const TARGET_DIR = path.join(__dirname, '..', 'images-optimized');

const WEB_QUALITY = 80;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

async function optimizeImage(sourcePath, targetPath) {
  try {
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    let resizeOptions = {};
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      resizeOptions = {
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true
      };
    }

    await image
      .resize(resizeOptions)
      .webp({ quality: WEB_QUALITY, effort: 6 })
      .toFile(targetPath);

    const originalSize = fs.statSync(sourcePath).size;
    const optimizedSize = fs.statSync(targetPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.relative(SOURCE_DIR, sourcePath)} -> ${path.relative(TARGET_DIR, targetPath)} (${savings}% smaller)`);
    return { success: true, originalSize, optimizedSize };
  } catch (error) {
    console.error(`✗ Failed to optimize ${sourcePath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function processDirectory(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.relative(SOURCE_DIR, sourcePath);

    if (entry.isDirectory()) {
      await processDirectory(sourcePath, path.join(targetDir, entry.name));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const targetPath = path.join(targetDir, `${baseName}.webp`);

        if (!fs.existsSync(targetPath)) {
          await optimizeImage(sourcePath, targetPath);
        } else {
          console.log(`⊘ Skipping ${relativePath} (already exists)`);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${TARGET_DIR}`);
  console.log('');

  await processDirectory(SOURCE_DIR, TARGET_DIR);

  console.log('');
  console.log('Optimization complete!');
}

main().catch(console.error);