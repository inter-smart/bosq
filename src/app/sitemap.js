const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const locales = ['en', 'ar']

async function fetchSlugs(path, dataKey) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return json?.data?.[dataKey] ?? []
  } catch {
    return []
  }
}

function staticUrls(routes) {
  return locales.flatMap((locale) =>
    routes.map(({ path, lastModified, changeFrequency, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  )
}

export default async function sitemap() {
  const now = new Date()

  const [products, blogs, news, projects] = await Promise.all([
    fetchSlugs('/api/frontend/products/product-listing?limit=500', 'products'),
    fetchSlugs('/api/frontend/blogs/blog-list?limit=500', 'blog'),
    fetchSlugs('/api/frontend/news/news-list?limit=500', 'news'),
    fetchSlugs('/api/frontend/projects/project-list?slug=all&limit=500', 'projects'),
    // fetchSlugs('/api/frontend/office-chairs?limit=500', 'officeChairs'),
  ])

  const productSlugs = [...new Set(products.map((p) => p.base_slug).filter(Boolean))]

  const staticRoutes = [
    { path: '',                       priority: 1.0, changeFrequency: 'daily',   lastModified: now },
    { path: '/about',                 priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { path: '/products',              priority: 0.9, changeFrequency: 'daily',   lastModified: now },
    { path: '/blogs',                 priority: 0.8, changeFrequency: 'weekly',  lastModified: now },
    { path: '/news',                  priority: 0.8, changeFrequency: 'weekly',  lastModified: now },
    { path: '/projects',              priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { path: '/contact',               priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { path: '/faqs',                  priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { path: '/material-guide',        priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { path: '/sustainability',        priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { path: '/customization',         priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { path: '/ergonomic-chair-guide', priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { path: '/search-results',        priority: 0.5, changeFrequency: 'daily',   lastModified: now },
    // (auth) routes
    { path: '/login',                 priority: 0.5, changeFrequency: 'yearly',  lastModified: now },
    { path: '/signup',                priority: 0.5, changeFrequency: 'yearly',  lastModified: now },
    { path: '/forgot-password',       priority: 0.4, changeFrequency: 'yearly',  lastModified: now },
    { path: '/create-password',       priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { path: '/otp-submission',        priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    // account routes
    { path: '/account',               priority: 0.4, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/profile',       priority: 0.4, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/orders',        priority: 0.4, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/cancelled-orders', priority: 0.3, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/wishlist',      priority: 0.4, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/manage-address',priority: 0.3, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/settings',      priority: 0.3, changeFrequency: 'monthly', lastModified: now },
    { path: '/account/coupons',       priority: 0.3, changeFrequency: 'monthly', lastModified: now },
    // shop routes
    { path: '/cart',                  priority: 0.4, changeFrequency: 'daily',   lastModified: now },
    { path: '/checkout',              priority: 0.3, changeFrequency: 'daily',   lastModified: now },
    { path: '/order',                 priority: 0.3, changeFrequency: 'daily',   lastModified: now },
    { path: '/privacy-policy',        priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { path: '/terms-and-conditions',  priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { path: '/return-policy',         priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { path: '/delivery-policy',       priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
    { path: '/warranty-policy',       priority: 0.3, changeFrequency: 'yearly',  lastModified: now },
  ]

  return [
    ...staticUrls(staticRoutes),

    ...locales.flatMap((locale) =>
      productSlugs.map((slug) => ({
        url: `${SITE_URL}/${locale}/products/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    ),

    ...locales.flatMap((locale) =>
      blogs.map((item) => ({
        url: `${SITE_URL}/${locale}/blogs/${item.slug}`,
        lastModified: item.updatedAt || now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    ),

    ...locales.flatMap((locale) =>
      news.map((item) => ({
        url: `${SITE_URL}/${locale}/news/${item.slug}`,
        lastModified: item.updatedAt || now,
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
    ),

    ...locales.flatMap((locale) =>
      projects.map((item) => ({
        url: `${SITE_URL}/${locale}/projects/${item.slug}`,
        lastModified: item.updatedAt || now,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    ),

    // ...locales.flatMap((locale) =>
    //   officeChairs.map((item) => ({
    //     url: `${SITE_URL}/${locale}/office-chairs/${item.slug}`,
    //     lastModified: item.updatedAt || now,
    //     changeFrequency: 'monthly',
    //     priority: 0.6,
    //   }))
    // ),
  ]
}
