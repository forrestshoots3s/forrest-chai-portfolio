import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const photosDir = path.join(root, 'public/photos');
const thumbsDir = path.join(photosDir, 'thumbs');

await fs.mkdir(thumbsDir, { recursive: true });

const files = (await fs.readdir(photosDir)).filter((file) => /\.(jpe?g|png)$/i.test(file));

await Promise.all(
  files.map(async (file) => {
    const source = path.join(photosDir, file);
    const target = path.join(thumbsDir, file.replace(/\.[^.]+$/, '.webp'));
    await sharp(source)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(target);
  }),
);

console.log(`Generated ${files.length} photo thumbnails.`);
