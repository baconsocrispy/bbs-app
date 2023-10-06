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

export const deleteProduct = async (
  slug: string
): Promise<void> => {
  const url = `${ baseApiUrl() }/v1/products/${ slug }`;

  try {
    const response = await fetch(url, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${ doorkeeperCredentials() }`,
      },
    });

    if (response.ok) { revalidate('/');
    } else {
      console.log('Error deleting product')
    }
  } catch (error) {
    console.error('An error occurred: ', error);
  };
};

// format form data for api request
export const encodeProductFormData = (
  data: ProductFormData,
  defaultImage?: File,
  images?: FileList
): FormData => {
  // create new formData object
  const formData = new FormData();

  // doorkeeper grant type
  formData.append('grant_type', 'password');

  // product attributes
  formData.append('product[name]', data.product.name);
  formData.append('product[short_description]', data.product.short_description);

  // product images
  if (defaultImage) {
    formData.append('product[default_image]', defaultImage);
  }

  if (images) {
    // convert FileList to array
    const imageArray = Array.from(images);

    for (const image of imageArray) {
      formData.append('product[product_images][]', image);
    }
  }

  // nested attributes
  // features
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
        `product[features_attributes][${ index }][id]`, feature.id.toString()
      );

      // _destroy
      feature._destroy && formData.append(
        `product[features_attributes][${ index }][_destroy]`, feature._destroy.toString()
      );
    })
  }

  // groups
  if (data.product.product_groupings_attributes) {
    data.product.product_groupings_attributes.forEach((grouping, index) => {
      // group_id
      formData.append(
        `product[product_groupings_attributes][${ index }][group_id]`, grouping.group_id.toString()
      );

      // id
      grouping.id && formData.append(
        `product[product_groupings_attributes][${ index }][id]`, grouping.id.toString()
      );

      // _destroy
      grouping._destroy && formData.append(
        `product[product_groupings_attributes][${ index }][_destroy]`, grouping._destroy.toString()
      );

      console.log(grouping._destroy)
    })
  }

  // specs
  if (data.product.specs_attributes) {
    data.product.specs_attributes.forEach((spec, index) => {
      // category
      formData.append(`product[specs_attributes][${ index }][category]`, spec.category);

      // text
      formData.append(`product[specs_attributes][${ index }][text]`, spec.text);

      // id
      spec.id && formData.append(
        `product[specs_attributes][${ index }][id]`, spec.id.toString()
      );

      // _destroy
      spec._destroy && formData.append(
        `product[specs_attributes][${ index }][_destroy]`, spec._destroy.toString()
      );
    })
  }

  // text-blocks
  if (data.product.text_blocks_attributes) {
    data.product.text_blocks_attributes.forEach((textBlock, index) => {
      // text
      formData.append(`product[text_blocks_attributes][${ index }][text]`, textBlock.text);

      // title
      textBlock.title && formData.append(
        `product[text_blocks_attributes][${ index }][title]`, textBlock.title
      );

      // id
      textBlock.id && formData.append(
        `product[text_blocks_attributes][${ index }][id]`, textBlock.id.toString()
      );

      // _destroy
      textBlock._destroy && formData.append(
        `product[text_blocks_attributes][${ index }][_destroy]`, textBlock._destroy.toString()
      );
    })
  }
  
  return formData;
}