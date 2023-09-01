'use client'

// library
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// api
import { createProduct } from "../../api/products-api";
import { Category } from "@/app/categories/page";
import { getAllCategories } from "@/app/api/categories-api";

// types
export type ProductFormData = {
  product: {
    name: string;
    short_description: string;
    product_images: File[]; 
    category_ids: number[];
  }
};

const ProductForm = () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const [ categories, setCategories ] = useState<Category[] | null>(null)
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllCategories();
      const categories: Category[] = await response.json();
      setCategories(categories);
      console.log(categories);
    };

    categories ? setLoading(false) : getCategories();
  }, [ categories ])

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
    setLoading(true);

    const response = await createProduct(formData);
    const product = await response.json();

    if (response.status === 201 && product) {
      router.push(`/products/${ product.id }`)
    } else {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

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

      <div className="category-select">
        { categories && categories.map((category) => 
          <div key={ category.id }>
            <input 
              id={ `category-${ category.name }` }
              type='checkbox'
              { ...register(`product.category_ids.${ category.id }`)}
              value={ category.id }
            />
            <label htmlFor={  `category-${ category.name }` }>
              { category.name }
            </label>
          </div>
        )}
      </div>

      {/* submit button */}
      <button 
        className="product-form__button"
        type='submit'
      >
        Submit
      </button>
    </form>
  )
};

export default ProductForm;