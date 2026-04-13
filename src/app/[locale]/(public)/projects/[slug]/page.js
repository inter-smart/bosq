import HomeEnquiry from "@/components/blocks/home/home-enquiry";
import ProductDetail from "@/components/blocks/product/product-detail";
import ProductHero from "@/components/blocks/product/product-hero";
import ProductSimilar from "@/components/blocks/product/product-similar";
import ProjectDetail from "@/components/blocks/project/project-detail";
import ProjectSolution from "@/components/blocks/project/project-solution";
import ProjectSpecialized from "@/components/blocks/project/project-specialized";
import { getProjectDetails } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData(`project-${slug}`, locale, `projects/${slug}`);

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

const local_data = {
  heroData: {
    title: "Wonderworld Ltd - Office Space, UAE",
    description: null,
  },
  projectData: {
    year: "2025",
    location: "Dubai, UAE",
    category: "Corporate Headquaters",
    media: {
      type: "image",
      mobile_path: "/images/projects-hero-1.jpg",
      desktop_path: "/images/projects-hero-1.jpg",
      media_alt: "projects-hero-1",
    },
    title: "Wonderworld Ltd - Office Space, UAE",
    description:
      "<p>The Commons represents a new paradigm in workplace design, combining flexible collaboration spaces with private work areas. This 15,000 sq ft headquarters features BOSQ's complete ergonomic furniture solution, designed to support 200+ employees across multiple departments.</p><p>Our comprehensive approach included custom executive suites, open collaboration zones, meeting rooms, and specialized areas for different work styles. Every piece of furniture was selected and configured to promote employee wellbeing and productivity.</p>",
    projectInfo: [
      {
        id: 1,
        title: "Project Size",
        description: "15,000 sq ft",
      },
      {
        id: 2,
        title: "Workstations",
        description: "200+ Employees",
      },
      {
        id: 3,
        title: "Completion",
        description: "March 2025",
      },
      {
        id: 4,
        title: "Timeline",
        description: "8 Weeks",
      },
    ],
    projectGallery: [
      {
        id: 1,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-1.jpg",
          media_alt: "projects-gallery-1",
        },
      },
      {
        id: 2,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-2.jpg",
          media_alt: "projects-gallery-2",
        },
      },
      {
        id: 4,
        media: {
          type: "image",
          media_path: "/images/projects-gallery-2.jpg",
          media_alt: "projects-gallery-2",
        },
      },
    ],
  },
  solutionData: {
    media: {
      media_type: "image",
      media_path: "/images/project-solution-1.jpg",
      media_alt: "project-solution-1",
    },
    title: "The BOSQ Solution",
    description:
      "<p>Our integrated approach to The Commons project encompassed every aspect of the workspace environment. From initial space planning to final installation, we provided a comprehensive solution that addressed both aesthetic and functional requirements.</p><p>The result is a workspace that not only looks exceptional but performs at the highest level, supporting employee productivity and wellbeing through thoughtful ergonomic design.</p><ul><li>Custom space planning and layout optimization</li><li>Ergonomic furniture selection and configuration</li><li>Professional installation and project management</li><li>Ongoing support and maintenance services</li></ul>",
  },
  specializedAreasData: {
    title: "Specialized Areas",
    items: [
      {
        id: 1,
        media: {
          media_type: "image",
          media_path: "/images/project-item-1.jpg",
          media_alt: "project-item-1",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/en/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 2,
        media: {
          media_type: "image",
          media_path: "/images/project-item-2.jpg",
          media_alt: "project-item-2",
        },
        title: "Dawn  Ltd - Creative Workspace",
        slug: "/en/projects/wonderworld-office-space",
        category: "Workspace",
      },
      {
        id: 3,
        media: {
          media_type: "image",
          media_path: "/images/project-item-3.jpg",
          media_alt: "project-item-3",
        },
        title: "JOY  Accounts - Innovative Office Design",
        slug: "/en/projects/wonderworld-office-space",
        category: "Workspace Healthcare",
      },
      {
        id: 4,
        media: {
          media_type: "image",
          media_path: "/images/project-item-4.jpg",
          media_alt: "project-item-4",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/en/projects/wonderworld-office-space",
        category: "Education",
      },
      {
        id: 5,
        media: {
          media_type: "image",
          media_path: "/images/project-item-5.jpg",
          media_alt: "project-item-5",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/en/projects/wonderworld-office-space",
        category: "Hospitality",
      },
      {
        id: 6,
        media: {
          media_type: "image",
          media_path: "/images/project-item-6.jpg",
          media_alt: "project-item-6",
        },
        title: "Wonderworld Ltd - Office Space",
        slug: "/en/projects/wonderworld-office-space",
        category: "Hospitality",
      },
    ],
  },
  enquiryData: {
    media: {
      media_type: "image",
      media_path: "/images/home-enquiry-1.jpg",
      media_alt: "home-enquiry-1",
    },
    title: "Let's Get in Touch",
    description:
      "<p>Let's work together to find the most effective solution for your business.</p>",
    button: null,
  },
};

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const { data, error } = await getProjectDetails({ slug });


  
   if (error || !data) {
      return <NotFound />;
    }

  const {
    heroData,
    cmsData,
    projectData,
    solutionData,
    specializedAreasData,
    enquiryData,
  } = data;

  const isEn = locale === "en";
  const slugData = locale === "en" ? "Project" : "تفاصيل المشروع";




  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={heroData?.title}
        slugData={slugData}
        type="project"
      />
      <ProjectDetail
        locale={locale}
        data={local_data?.projectData}
        projectData={projectData}
      />
      <ProjectSolution locale={locale} data={solutionData} />

      {specializedAreasData?.items?.length > 0 && (
        <ProjectSpecialized locale={locale} data={specializedAreasData} />
      )}

      <HomeEnquiry
      isEN={isEn}
        locale={locale}
        data={enquiryData}
        projectId={projectData?.id}
        type={"project"}
      />
    </>
  );
}
