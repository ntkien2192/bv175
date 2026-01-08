import { fnGetAllPageSlug } from '@/src/services/page'; // đường dẫn đúng của bạn

export async function GET() {
  const siteUrl = process.env.SITE_URL;

  // Lấy tất cả slug động
  const slugs = await fnGetAllPageSlug();

  // Hàm escape XML để tránh lỗi ký tự đặc biệt trong URL
  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // Tạo XML URL cho từng slug
  const urls = slugs
    .map((item: any) => {
      // item có thể là { slug: string }
      const slug = typeof item === 'string' ? item : item.slug;
      if (!slug) return ''; // bỏ qua nếu không có slug
      return `
      <url>
        <loc>${siteUrl}/${escapeXml(slug)}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
    })
    .join('');

  // Thêm trang chủ (home)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}</loc>
        <changefreq>hourly</changefreq>
        <priority>1.0</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=600, stale-while-revalidate',
    },
  });
}
