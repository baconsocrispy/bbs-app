// helpers
import { 
  backendUrlEncodedRequest,
  baseApiUrl,
  doorkeeperCredentials
} from "./api-helpers"

// api
import { revalidate } from "./server-actions";

// types
import { Product } from "./api-types";
import { ProductFormData } from "../components/product-form/product-form.component";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl() }/v1/products`
  );
  const { products } = await response.json();
  return products;
};

export const getProduct = async (
  slug: string
): Promise<Product> => {
  const response = await backendUrlEncodedRequest(
    'GET', `${ baseApiUrl( )}/v1/products/${ slug }`
  );
  const product: Product = await response.json();
  return product;
};

export const createProduct = async (
  data: FormData
): Promise<Product> => {

  const url = `${ baseApiUrl() }/v1/products`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: data
  });

  revalidate('/');

  const product: Product = await response.json();

  return product;
};

export const updateProduct = async (
  slug: string,
  data: FormData
): Promise<Product> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  const response = await fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ doorkeeperCredentials() }`,
    },
    body: data
  });

  revalidate('/');

  const product: Product = await response.json();

  return product;
};

export const encodeProductFormData = (
  data: ProductFormData, 
  defaultImage: File | null, 
  images: FileList | null
): FormData => {
  // create new formData object
  const formData = new FormData();

  // doorkeeper grant type
  formData.append('grant_type', 'password');

  // product attributes
  formData.append('product[name]', data.product.name);
  formData.append('product[short_description]', data.product.short_description);
  formData.append('product[group_id]', data.product.group_id.toString());

  // product images
  if (defaultImage) {
    formData.append('product[default_image]', defaultImage)
  }

  if (images) {
    // convert FileList to array
    const imageArray = Array.from(images);

    for (const image of imageArray) {
      formData.append('product[product_images][]', image)
    }
  }

  // nested attributes
  if (data.product.features_attributes) {
    data.product.features_attributes.forEach((feature, index) => {
      // text
      formData.append(`product[features_attributes][${ index }][text]`, feature.text);

      // highlight
      feature.highlight && formData.append(
        `product[features_attributes][${ index }][highlight]`, feature.highlight.toString()
      );

      // id
      feature.id && formData.append(
        `product[features_attributes][${ index }][highlight]`, feature.id.toString()
      );
    })
  }
  
  return formData;
}