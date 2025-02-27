import fs from 'fs';
import path from 'path';

const pages = [
  '/',
  '/login',
  '/register',
  '/plans',
  '/guide',
  '/privacy'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>https://flomo-extension-pages.hotstrips.org${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
</urlset>`;

fs.writeFileSync(path.join('public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
