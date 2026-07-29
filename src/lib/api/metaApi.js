import { parseOtherMeta } from "../helper.js";
import { API_BASE_URL, defaultMeta, DefaultOgImage } from "./constants";

export async function getMetaData(pageKey, lang = "en", pagename = "") {
  const API_BASE_URL = process.env.API_URL || "http://localhost:4000";
  const fallback = {
    en: {
      title: "BOSQ",
      description:
        "BOSQ is a modern business solutions platform delivering innovative products, digital services, and scalable solutions across multiple industries.",
      keywords: "BOSQ, business solutions platform, digital services, innovative products, enterprise solutions, technology solutions",
    },
    ar: {
      title: "بوسك",
      description: "بوسك هي منصة حديثة لحلول الأعمال تقدم منتجات مبتكرة وخدمات رقمية وحلول قابلة للتوسع لمختلف القطاعات.",
      keywords: "بوسك، منصة حلول الأعمال، الخدمات الرقمية، المنتجات المبتكرة، حلول المؤسسات، الحلول التقنية",
    },
  };

  const pageMeta = defaultMeta?.[pageKey]?.[lang] || defaultMeta?.[pageKey]?.en || fallback[lang];

  const isAr = lang === "ar";

  const metaTitle = pageMeta.title;
  const metaDescription = pageMeta.description;
  const metaKeywords = pageMeta.keywords;

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/frontend/meta-tags/${pageKey}`, {
      method: "GET",
      headers,
    });

    const result = await response.json();
    const meta = result.data;

    if (result.success) {
      const { other } = parseOtherMeta(meta?.other_meta || "");
      return {
        title: meta?.meta_title || metaTitle,
        description: meta?.meta_description || metaDescription,
        keywords: meta?.meta_keywords || metaKeywords,
        // Enhanced SEO fields
        openGraph: {
          title: meta?.og_title || meta?.meta_title || metaTitle,
          description: meta?.og_description || meta?.meta_description || metaDescription,
          images: meta?.og_image ? [{ url: meta.og_image, width: 1200, height: 630 }] : [{ url: DefaultOgImage, width: 1200, height: 630 }],
          type: "website",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
        },
        twitter: {
          card: "summary_large_image",
          title: meta?.twitter_title || meta?.meta_title || metaTitle,
          description: meta?.twitter_description || meta?.meta_description || metaDescription,
          images: meta?.twitter_image ? [meta.twitter_image] : [],
        },
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
        },
        other: {
          ...other,
        },

        error: null,
      };
    }

    // fallback if API fails but status != success
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang, pagename);
  } catch (error) {
    // catch network or API errors
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang, pagename);
  }
}

export async function getProductMetaData(lang, currentUrl, slug, variantSku = null, model = null, attributeFilters = {}) {
  const API_BASE_URL = process.env.API_URL || "http://localhost:4000";
  const fallback = {
    en: {
      title: "BOSQ",
      description:
        "BOSQ is a modern business solutions platform delivering innovative products, digital services, and scalable solutions across multiple industries.",
      keywords: "BOSQ, business solutions platform, digital services, innovative products, enterprise solutions, technology solutions",
    },
    ar: {
      title: "بوسك",
      description: "بوسك هي منصة حديثة لحلول الأعمال تقدم منتجات مبتكرة وخدمات رقمية وحلول قابلة للتوسع لمختلف القطاعات.",
      keywords: "بوسك، منصة حلول الأعمال، الخدمات الرقمية، المنتجات المبتكرة، حلول المؤسسات، الحلول التقنية",
    },
  };

  const pageMeta = fallback[lang];

  const metaTitle = pageMeta.title;
  const metaDescription = pageMeta.description;
  const metaKeywords = pageMeta.keywords;

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };

  try {
    const params = new URLSearchParams({
      slug,
    });

    if (variantSku) params.append("variantSku", variantSku);
    if (model) params.append("model", model);

    Object.entries(attributeFilters).forEach(([attrSlug, valueSlug]) => {
      params.append(`attr[${attrSlug}]`, valueSlug);
    });
    const response = await fetch(`${API_BASE_URL}/api/frontend/products/product-meta?${params.toString()}`, {
      method: "GET",
      headers,
    });

    const result = await response.json();
    const metaDetails = result.data;

    console.log("metaDetails", metaDetails);

    const { meta_title, meta_description, meta_keywords, other_meta, product } = metaDetails;
    const { variant_image } = product;

    // Use blog's own image or fallback
    const ogImage = variant_image || DefaultOgImage;

    if (result.success) {
      const { other } = parseOtherMeta(other_meta || "");
      return {
        title: meta_title,
        description: meta_description,
        keywords: meta_keywords,

        // Enhanced SEO fields
        openGraph: {
          title: meta_title,
          description: meta_description,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: meta_title,
            },
          ],
          url: currentUrl,
        },

        twitter: {
          card: "summary_large_image",
          title: meta_title,
          description: meta_description,
          images: [ogImage],
        },

        other: {
          ...other,
        },

        alternates: {
          canonical: currentUrl,
        },
      };
    }

    // fallback if API fails but status != success
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang);
  } catch (error) {
    console.log(error);

    // catch network or API errors
    return buildFallbackMetadata(metaTitle, metaDescription, metaKeywords, lang);
  }
}

function buildFallbackMetadata(title, description, keywords, lang, pagename) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${pagename}`,
    },
    other: {},
    links: [],
    structuredData: null,
    error: "No metadata found",
  };
}
