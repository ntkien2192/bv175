module.exports = {
  siteUrl: process.env.SITE_URL || 'https://benhvien175.vn',
  changefreq: 'daily',
  // here is the new code
  priority: 0.8,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  alternateRefs: [
    {
      href: process.env.SITE_URL,
      hreflang: 'vi',
    },
    {
      href: `${process.env.SITE_URL}/en`,
      hreflang: 'en',
    },
  ],
  additionalPaths: async (config) => [
    {
      loc: '/',
      priority: 1, // Trang chủ ưu tiên 1
      changefreq: 'daily',
      lastmod: new Date().toISOString(),
    },
  ],
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;
    // Set higher priority for home and team pages
    if (path === '/') {
      priority = 1.0; // Highest priority for the homepage
      changefreq = 'hourly'; // Change frequency for the homepage, hourly is just an example consult the sitemap documentation or your SEO expert
    }

    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: priority, // Dynamic priority based on the page
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${process.env.SITE_URL}${path}`,
          hreflang: 'vi',
        },
        {
          href: `${process.env.SITE_URL}/en${path}`,
          hreflang: 'en',
        },
      ],
    };
  },
};
