import type { APIRoute } from 'astro';

const pages = [
  '',
  '/software',
  '/descargas',
  '/guias',
  '/herramientas',
  '/es',
  '/es/software',
  '/es/descargas',
  '/es/guias',
  '/es/herramientas'
];

const baseUrl = 'https://www.codextreme.me';

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
