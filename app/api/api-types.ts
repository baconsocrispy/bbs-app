export type Category = {
  banner: SerializedImage;
  created_at: string;
  id: number;
  image: SerializedImage;
  name: string;
  groups: Group[];
  short_description: string;
  slug: string;
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
  images: SerializedImage[];
  href: string;
};

export type Product = {
  created_at: string;
  id: number;
  name: string;
  image: SerializedImage;
  images: SerializedImage[];
  short_description: string;
  slug: string;
};

export type SerializedImage = {
  byteSize: number;
  filename: string;
  id: number;
  url: string;
};