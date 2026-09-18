const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = 'images';
const outputDir = 'images-optimized';

const targets = [
  // Diplora mockups
  'mockups/diplora/omnboarding-tilt.png',
  'mockups/diplora/home-tilt.png',
  'mockups/diplora/log-tilt.png',
  // FitPhone mockups
  'mockups/home/whatsapp-home-portrait.png',
  'mockups/activty/whatsapp-activity-portrait.png',
  'mockups/stats.png',
  // Motivate mockups
  'motivate/mockup-1.png',
  'motivate/mockup-2.png',
  'motivate/mockup-3.png',
  'motivate/mockup-4.png',
  'motivate/mockup-5.png',
  // Other large images on index
  'mockups/diplora/Onboarding Attach-(Compressify.io)-portrait.png',
  'mockups/diplora/onboarding-portrait.png',
  'mockups/diplora/logbook-portrait.png',
  'mockups/diplora/diplorahomeportrait.png',
  'mockups/diplora/lowpowerportrait.png',
  'mockups/diplora/whatactivityportrait.png',
  // FitPhone page images
  'mockups/onboarding.png',
  'mockups/education.png',
  'mockups/journelentry/whatsapp-journal-portrait.png',
  'mockups/activty/whatsapp-activities-portrait.png',
  'ideation.jpeg',
  'implement.jpeg',
  'sketches.jpeg',
  'sss.png',
];

async function compressImage(inputPath) {
  try {
    const inputFull = path.join(imagesDir, inputPath);
    const outputPath = inputPath.replace(/\.[^.]+$/, '.webp');
    const outputFull = path.join(outputDir, outputPath);

    // Ensure output directory exists
    const outDir = path.dirname(outputFull);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const stats = fs.statSync(inputFull);
    const sizeBefore = stats.size;

    await sharp(inputFull)
      .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputFull);

    const statsAfter = fs.statSync(outputFull);
    const sizeAfter = statsAfter.size;
    const savings = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);

    console.log(`✓ ${inputPath} → ${outputPath}`);
    console.log(`  ${(sizeBefore / 1024 / 1024).toFixed(2)} MB → ${(sizeAfter / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)`);
    return { inputPath, outputPath, sizeBefore, sizeAfter };
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('Compressing images...\n');
  const results = [];
  for (const target of targets) {
    const result = await compressImage(target);
    if (result) results.push(result);
  }

  const totalBefore = results.reduce((sum, r) => sum + r.sizeBefore, 0);
  const totalAfter = results.reduce((sum, r) => sum + r.sizeAfter, 0);
  const totalSavings = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);

  console.log('\n--- Summary ---');
  console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (${totalSavings}% smaller)`);
  console.log(`\nOptimized images saved to: ${outputDir}/`);
  console.log('Update your HTML to reference .webp files from images-optimized/');
}

main();