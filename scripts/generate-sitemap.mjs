import fs from 'fs';
import path from 'path';

const postIndex = JSON.parse(fs.readFileSync(path.join('public', 'posts', 'index.json'), 'utf8'));
const pages = [
  '/',
  '/plans',
  '/guide',
  '/posts',
  '/privacy',
  '/terms',
  ...postIndex.map(({ slug }) => `/posts/${slug}`),
];

const lastModified = new Date().toISOString().split('T')[0];
const urls = pages.map(page => [
  '  <url>',
  `    <loc>https://flomo-extension-pages.hotstrips.org${page}</loc>`,
  `    <lastmod>${lastModified}</lastmod>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>0.8</priority>',
  '  </url>',
].join('\n')).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(path.join('public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
