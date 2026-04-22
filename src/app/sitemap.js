import fs from "fs";
import path from "path";

// Function to fetch dynamic data from API
async function fetchApi(endpoint) {
  const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Automatically discover static routes from app/[locale]/(public) directory
function getStaticRoutes(dir, baseRoute = "") {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    // Skip special files, api routes, and dynamic routes
    if (
      entry.name.startsWith("_") ||
      entry.name === "api" ||
      entry.name.includes("[") ||
      entry.name === "not-found.js" ||
      entry.name === "layout.js" ||
      entry.name === "loading.js" ||
      entry.name === "error.js"
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("(")) {
        // Recurse into grouping folders like (public) or (shop)
        routes = routes.concat(getStaticRoutes(fullPath, baseRoute));
      } else {
        const hasPage =
          fs.existsSync(path.join(fullPath, "page.js")) ||
          fs.existsSync(path.join(fullPath, "page.tsx"));

        const currentRoute = baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`;

        if (hasPage) {
          routes.push(currentRoute);
        }

        // Recursively check subdirectories
        routes = routes.concat(getStaticRoutes(fullPath, currentRoute));
      }
    }
  }

  return routes;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const languages = ["en", "ar"];
  const staticDir = path.join(process.cwd(), "src/app/[locale]");

  // 1. Get all static routes automatically
  const discoveredStaticPaths = getStaticRoutes(staticDir);
  const staticPaths = ["", ...new Set(discoveredStaticPaths)];

  // 2. Fetch Dynamic Routes
  const [productsData, blogsData, newsData, allProjectsResult] = await Promise.all([
    fetchApi("/api/frontend/products/product-listing?page=1&limit=1000"),
    fetchApi("/api/frontend/blogs/blog-list?page=1&limit=1000"),
    fetchApi("/api/frontend/news/news-list?page=1&limit=1000"),
    fetchApi("/api/frontend/projects/project-list?slug=all&limit=1000")
  ]);

  const dynamicRoutes = [];

  // Products
  if (productsData?.success && productsData?.data?.products) {
    productsData.data.products.forEach((product) => {
      if (product.slug) dynamicRoutes.push(`/products/${product.slug}`);
    });
  }

  // Blogs
  if (blogsData?.success && blogsData?.data?.blog) {
    blogsData.data.blog.forEach((blog) => {
      if (blog.slug) dynamicRoutes.push(`/blogs/${blog.slug}`);
    });
  }

  // News
  if (newsData?.success && newsData?.data?.news) {
    newsData.data.news.forEach((item) => {
      if (item.slug) dynamicRoutes.push(`/news/${item.slug}`);
    });
  }

  // Projects
  if (allProjectsResult?.success && allProjectsResult?.data?.projects) {
    allProjectsResult.data.projects.forEach((project) => {
      if (project.slug) dynamicRoutes.push(`/projects/${project.slug}`);
    });
  }

  // 3. Combine and generate routes for each language
  const allPaths = [...new Set([...staticPaths, ...dynamicRoutes])];

  const sitemapEntries = languages.flatMap((lang) =>
    allPaths.map((route) => {
      const isRoot = route === "";
      return {
        url: `${cleanBaseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: isRoot ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
      };
    })
  );

  return sitemapEntries;
}
