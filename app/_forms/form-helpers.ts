// form data types
import { AuthFormData } from "./auth-form/auth-form.component";
import { ProductFormData } from "./product-form/product-form.component";

// convert auth form data into URLSearchParams format
export const urlEncodeFormData = (
  data: AuthFormData | undefined
): URLSearchParams | undefined => {
  if (!data) return;

  // url encode form data
  const params = new URLSearchParams();

  // doorkeeper config
  params.append('grant_type', process.env.NEXT_PUBLIC_DOORKEEPER_GRANT_TYPE as string);

  // user auth config
  if ('user' in data && data.user) {
    params.append('email', data.user.email);
    params.append('password', data.user.password);

    if (data.user.firstName) { 
      params.append('first_name', data.user.firstName) 
    }

    if (data.user.lastName) { 
      params.append('last_name', data.user.lastName) 
    }

    if (data.user.passwordConfirmation) { 
      params.append('password_confirmation', data.user.passwordConfirmation) 
    }
  }

  return params;
};

// format product form data for api request
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
};