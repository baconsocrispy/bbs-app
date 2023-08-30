'use client'

// library
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// api
import { createProduct } from "../../api/products-api";

// types
export type ProductFormData = {
  product: {
    name: string;
    short_description: string;
    product_images: File[]; 
  }
}

const ProductForm = () => {
  // state
  const router = useRouter();

  // useForm config
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>();

   // handler
   const submitHandler:SubmitHandler<ProductFormData> = async (
    formData: ProductFormData
  ) => {
    const response = await createProduct(formData);
    const product = await response.json();

    if (response.status === 201 && product) {
      router.push(`/products/${ product.id }`)
    }
  }

  return (
    <form 
      id="product"
      className="product-form"
      encType="multipart/form-data"
      onSubmit={ handleSubmit(submitHandler)}
    >
      {/* product name */}
      <label 
        className="product-form__label"
        htmlFor="name"
      >
        Name
      </label>
      <input
        id="name" 
        className="product-form__input"
        type="text"
        { ...register('product.name')}
        autoComplete="false" 
      />

      {/* product description */}
      <label
        className="product-form__label" 
        htmlFor="short-description"
      >
        Description
      </label>
      <textarea
        id="short-description"
        className="product-form__textarea" 
        { ...register('product.short_description')} 
      />

      {/* product images */}
      <label 
        className="product-form__label"
        htmlFor="product-images"
      >
        Images
      </label>
      <input 
        id="product-images"
        className="product-form__attach-button"
        type="file"
        { ...register('product.product_images')} 
        multiple
      />

      {/* submit button */}
      <button 
        className="product-form__button"
        type='submit'
      >
        Submit
      </button>
    </form>
  )
}

export default ProductForm;