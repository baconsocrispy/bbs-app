export type Category = {
  categoryImage: SerializedImage;
  created_at: string;
  id: number;
  name: string;
  products: Product[];
  short_description: string;
  slug: string;
};

export type Group = {
  created_at: string;
  groupImage: SerializedImage;
  id: number;
  name: string;
  products: Product[];
  short_description: string;
  slug: string;
};

export type Product = {
  created_at: string;
  id: number;
  name: string;
  product_images: SerializedImage[];
  short_description: string;
};

export type SerializedImage = {
  byteSize: number;
  filename: string;
  id: number;
  url: string;
};