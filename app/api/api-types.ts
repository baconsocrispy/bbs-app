export type Category = {
  banner: SerializedImage;
  created_at: string;
  groups: Group[];
  id: number;
  image: SerializedImage;
  name: string;
  pinned: SerializedImage;
  short_description: string;
  slug: string;
  tagLine: string;
};

export type Feature = {
  created_at?: string;
  highlight?: string;
  id?: number;
  order?: number;
  product_id?: number;
  text: string;
  _destroy?: boolean;
};

export type Group = {
  banner: SerializedImage;
  created_at: string;
  id: number;
  image: SerializedImage;
  name: string;
  products: Product[];
  short_description: string;
  slug: string;
};

export type HeroContent = {
  button_text: string;
  header_text: string;
  id: number;
  images: SerializedImage[];
  href: string;
};

export type Product = {
  created_at: string;
  features: Feature[];
  featuresHeader?: string;
  id: number;
  name: string;
  image: SerializedImage;
  images: SerializedImage[];
  productGroupings: ProductGrouping[];
  short_description: string;
  slug: string;
  specs: Spec[];
  textBlocks: TextBlock[];
};

export type ProductGrouping = {
  group_id: number;
  group_name?: string;
  id?: number;
  product_id?: number;
  _destroy?: boolean;
}

export type SerializedImage = {
  byteSize: number;
  filename: string;
  id: number;
  url: string;
};

export type Spec = {
  category: string;
  created_at?: string;
  id?: number;
  product_id?: number;
  text: string;
  _destroy?: boolean;
};

export type TextBlock = {
  created_at?: string;
  id?: number;
  order?: number;
  product_id?: number;
  title?: string;
  text: string;
  _destroy?: boolean;
};