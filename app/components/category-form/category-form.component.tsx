'use client'

import { createCategory } from "@/app/api/categories-api";

const CategoryForm = () => {
  return (
    <form
      id="category"
      className="product-form"
      action={ formData => createCategory(formData) }
    >
      {/* category name */}
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
        name="category[name]"
      />

      {/* category description */}
      <label
        className="product-form__label" 
        htmlFor="short-description"
      >
        Description
      </label>
      <textarea
        id="short-description"
        className="product-form__textarea" 
        name="category[short_description]"
      />

      {/* category image */}
      <label 
        className="product-form__label"
        htmlFor="product-images"
      >
        Image
      </label>
      <input 
        id="category-image"
        className="product-form__attach-button"
        type="file"
        name="category[category_image]"
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
};

export default CategoryForm;