'use client'

// library
import { useState, useEffect } from "react";

// api
import { createProduct } from "../../api/products-api";
import { getAllCategories } from "@/app/api/categories-api";

// types
import { Category } from "@/app/categories/page";

const ProductForm= () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const [ categories, setCategories ] = useState<Category[] | null>(null)

  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllCategories();
      const categories: Category[] = await response.json();
      setCategories(categories);
    };

    categories ? setLoading(false) : getCategories();
  }, [ categories ])

  if (loading) return <p>Loading...</p>;

  return (
    <form 
      id="product"
      className="product-form"
      action={ formData => createProduct(formData) }
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
        autoComplete="false"
        name="product[name]"
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
        name="product[short_description]"
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
        name="product[product_images][]"
        multiple
      />

      <div className="category-select">
        { categories && categories.map((category) => 
          <div key={ category.id }>
            <input 
              id={ `category-${ category.name }` }
              type='checkbox'
              value={ category.id }
              name={ `product[category_ids][]`}
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