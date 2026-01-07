import BlogHero from "@/components/blocks/blog/blog-hero";
import BlogList from "@/components/blocks/blog/blog-list";

const local_data = {
  heroData: {
    media: {
      type: "image",
      mobile: {
        path: "/images/blog-hero-1.jpg",
        alt: "hero",
      },
      desktop: {
        path: "/images/blog-hero-1.jpg",
        alt: "hero",
      },
    },
    title: "Blogs",
    description: null,
    heroTitle: "Insights & Inspiration",
    heroDescription:
      "<p>Explore articles, stories, and updates from our world.</p>",
  },
  blogData: {
    blog: [
      {
        id: 1,
        media: {
          type: "image",
          path: "/images/blog-list-1.jpg",
          alt: "blog-1",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 2,
        media: {
          type: "image",
          path: "/images/blog-list-2.jpg",
          alt: "blog-2",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 3,
        media: {
          type: "image",
          path: "/images/blog-list-3.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 4,
        media: {
          type: "image",
          path: "/images/blog-list-4.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title: "5 Must-have Furniture for a New Office Setup in Dubai",
      },
      {
        id: 5,
        media: {
          type: "image",
          path: "/images/blog-list-5.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "The Advantages of Custom Workstations: Tailor-Made for Your Needs",
      },
      {
        id: 6,
        media: {
          type: "image",
          path: "/images/blog-list-6.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Different Ways to Optimize Your Workspace for Peak Productivity",
      },
      {
        id: 7,
        media: {
          type: "image",
          path: "/images/blog-list-1.jpg",
          alt: "blog-1",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 8,
        media: {
          type: "image",
          path: "/images/blog-list-2.jpg",
          alt: "blog-2",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 10,
        media: {
          type: "image",
          path: "/images/blog-list-3.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "Creating Smart Space Management with Modern Office Furniture Design",
      },
      {
        id: 11,
        media: {
          type: "image",
          path: "/images/blog-list-4.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title: "5 Must-have Furniture for a New Office Setup in Dubai",
      },
      {
        id: 12,
        media: {
          type: "image",
          path: "/images/blog-list-5.jpg",
          alt: "blog-3",
        },
        slug: "/en/blogs/blog-detail",
        publishedAt: "2024-12-01T10:00:00Z",
        readTime: 5,
        isPopular: true,
        title:
          "The Advantages of Custom Workstations: Tailor-Made for Your Needs",
      },
    ],
  },
};

export default async function BlogsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <BlogHero locale={locale} data={local_data?.heroData} slug={"Blogs"} />
      <BlogList locale={locale} data={local_data?.blogData} />
    </>
  );
}
