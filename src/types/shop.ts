export interface Media {
  type: 'image' | 'video';
  path: string;
  alt: string;
  thumbnail?: string;
}

export interface HeroData {
  title: string | null;
  description: string | null;
}

export interface ProductSummary {
  id: number;
  media: Media;
  hoverMedia?: Media;
  isStock: boolean;
  name: string;
  slug: string;
  price: number;
  category: string;
  colorVariant: string[] | null;
  shortDescription: string;
  description: string;
  productType: string[];
}

export interface SpecificationItem {
  id: number;
  title: string;
  iconPath: string;
}

export interface DesignModel {
  id: number;
  title: string;
  iconPath: string;
}

export interface ChooseDesign {
  title: string;
  selectedDesign: {
    image: string;
    title: string;
    subtitle: string;
  };
  model: DesignModel[];
  filters: {
    colors: string[];
    material: string[];
    fabricName: string[];
  };
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductDetails {
  title: string;
  content: {
    main: string;
    features: ProductFeature[];
  };
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ProductDetail extends ProductSummary {
  formattedPrice: string;
  currency: string;
  // Additional media capability for details
  productMedia?: Media[]; 
  purchaseTagline: string;
  specification: SpecificationItem[];
  projectGallery: Media[];
  chooseDesign: ChooseDesign;
  productDetails: ProductDetails;
  additionalInfo: {
    title: string;
    content: string;
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  enquiry: {
    title: string;
    subtitle: string;
    description: string;
  };
  relatedLinks: {
    matchingProducts: {
      text: string;
      url: string;
    };
  };
  frequentlyBought: ProductSummary[];
}

// Responses
export interface ProductListResponse {
  heroData: HeroData;
  productData: {
    title: string;
    description: string | null;
    button: string | null;
    product: ProductSummary[];
  };
}

export interface ProductDetailResponse {
  heroData: HeroData;
  productData: ProductDetail;
  similarData: {
    title: string;
    product: ProductSummary[];
  };
}

// Cart & Checkout Types

export interface CartAttributeOption {
  option_id: number;
  option_label: string;
  option_code?: string;
  attribute_name: string;
}

export interface CartItemAttributes {
  [key: string]: CartAttributeOption;
}

export interface CartItem {
  id: number;
  quantity: number;
  slug: string;
  type: string;
  name: string;
  description: string;
  designDescription: string; // HTML string
  weight: number;
  total_weight: number;
  price: number;
  formatted_price: string;
  base_price: number;
  formatted_based_price: string;
  total: number;
  formatted_total: string;
  base_total: number;
  formatted_based_total: string;
  tax_percent: number;
  tax_amount: number;
  formatted_tax_amount: string;
  base_tax_amount: number;
  formatted_based_tax_amount: string;
  attributes: CartItemAttributes;
  media: Media;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  status: string; // "1"
  subscribed_to_news_letter: string; // "1"
  image: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CartData {
  id: number;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  shipping_method: string;
  coupon_code: string;
  items_count: number;
  items_qty: number;
  base_currency_code: string;
  channel_currency_code: string;
  cart_currency_code: string;
  grand_total: number;
  formatted_grand_total: string;
  base_grand_total: number;
  formatted_based_grand_total: string;
  sub_total: number;
  formatted_sub_total: string;
  base_sub_total: number;
  formatted_based_sub_total: string;
  tax_total: number;
  formatted_tax_total: string;
  base_tax_total: number;
  formatted_based_tax_total: string;
  discount: number;
  formatted_discount: string;
  base_discount: number;
  formatted_based_discount: string;
  is_guest: boolean;
  is_active: boolean;
  customer: Customer;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  is_default: boolean;
  full_name: string;
  company: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  country_code: string;
  postcode: string;
  phone: string;
}

export interface AddressCollection {
  title: string;
  items: Address[];
}

export interface CheckoutData extends CartData {
  shipping_charge: number;
  formatted_shipping_charge: string;
  shippingAddress: AddressCollection;
  billingAddress: AddressCollection;
  frequentlyBought: {
      title: string;
      description: string;
      items: ProductSummary[];
  }
}

export interface CartPageResponse {
  heroData: HeroData;
  cartData: CartData;
  similarData: {
    title: string;
    product: ProductSummary[];
  };
}

export interface CheckoutPageResponse {
  heroData: HeroData;
  checkoutData: CheckoutData;
}
