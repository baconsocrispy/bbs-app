'use client'
// library
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

// api
import { 
  createCategory, 
  updateCategory 
} from "@/app/api/categories-api";


// types
import { Category } from "@/app/api/api-types";
type CategoryFormProps = {
  category?: Category;
}

const CategoryForm: FC<CategoryFormProps> = ({ category }) => {
  // state
  const [ name, setName ] = useState(category ? category.name : '');
  const [ short_description, setShortDescription ] = useState(category ? category.short_description : '');
  const router = useRouter();

  // handlers
  const handleSubmit = async (formData: FormData) => {
    try {
      category ? 
        await updateCategory(category.slug, formData) : 
        await createCategory(formData);
      router.push('/');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      id="category"
      className="product-form"
      action={ formData => handleSubmit(formData) }
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
        value={ name }
        onChange={ (e) => setName(e.target.value) }
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
        value={ short_description }
        onChange={ (e) => setShortDescription(e.target.value) }
      />

      {/* category image */}
      <label 
        className="product-form__label"
        htmlFor="category-image"
      >
        Default Image
      </label>
      <input 
        id="category-image"
        className="product-form__attach-button"
        type="file"
        name="category[category_image]"
      />

      {/* banner image */}
      <label 
        className="product-form__label"
        htmlFor="banner-image"
      >
        Banner Image
      </label>
      <input 
        id="banner-image"
        className="product-form__attach-button"
        type="file"
        name="category[banner_image]"
      />

      {/* pinned image */}
      <label 
        className="product-form__label"
        htmlFor="pinned-image"
      >
        Pinned Image
      </label>
      <input 
        id="pinned-image"
        className="product-form__attach-button"
        type="file"
        name="category[pinned_image]"
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