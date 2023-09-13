'use client'

// library
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// api
import { createGroup } from "@/app/api/groups-api";
import { getAllCategories } from "@/app/api/categories-api";

// types
import { Category } from "@/app/api/api-types";


const GroupForm = () => {
  // state
  const [ categories, setCategories ] = useState<Category[] | null>(null);
  const router = useRouter();

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    getCategories();
  }, []);

  // handler
  const submitHandler = async (formData: FormData) => {
    try {
      await createGroup(formData);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
    id="group"
    className="product-form"
    action={ formData => submitHandler(formData) }
  >
    {/* group name */}
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
      name="group[name]"
    />

    {/* group description */}
    <label
      className="product-form__label" 
      htmlFor="short-description"
    >
      Description
    </label>
    <textarea
      id="short-description"
      className="product-form__textarea" 
      name="group[short_description]"
    />

    {/* group image */}
    <label 
      className="product-form__label"
      htmlFor="group-image"
    >
      Default Image
    </label>
    <input 
      id="group-image"
      className="product-form__attach-button"
      type="file"
      name="group[group_image]"
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
        name="group[banner_image]"
      />

    {/* category select */}
    <label
      className="product-form__label"
      htmlFor="category-select"
    >
      Category
    </label>
    <select
      id="category-select"
      className="product-form__select"
      name='group[category_id]'
    >
      { categories?.map((category) => 
        <option key={ category.id } value={ category.id }>
          { category.name }
        </option>
      )}
    </select>

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

export default GroupForm