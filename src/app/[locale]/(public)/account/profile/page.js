import AccountProfile from "@/components/blocks/account/account-profile";
import ProductHero from "@/components/blocks/product/product-hero";

const local_data = {
  heroData: {
    title: "My Profile",
    description: null,
  },
  userData: {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    status: "1",
    is_guest: true,
    is_active: true,
    email: "john.doe@email.com",
    gender: "Male",
    date_of_birth: "1991-05-15",
    phone: "+971 50 123 4567",
    address:
      "<p>123 Business Tower<br />Downtown, Dubai<br />United Arab Emirates</p>",
    subscribed_to_news_letter: "1",
    image: "/images/user-1.jpg",
    notes: "string",
    created_at: "2020-01-27 17:50:45",
    updated_at: "2020-01-27 17:50:45",
  },
};

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={"My Profile"}
      />
      <AccountProfile locale={locale} data={local_data?.userData} />
    </>
  );
}
