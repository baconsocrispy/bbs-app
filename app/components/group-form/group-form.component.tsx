'use client'

// library
import { useEffect, useState } from "react";

// api
import { createGroup } from "@/app/api/groups-api";
import { getAllCategories } from "@/app/api/categories-api";

// types
import { Category } from "@/app/api/api-types";


const GroupForm = () => {
  const [ categories, setCategories ] = useState<Category[] | null>(null)

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    getCategories();
  }, [])


  return (
    <form
    id="group"
    className="product-form"
    action={ formData => createGroup(formData) }
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
      Image
    </label>
    <input 
      id="group-image"
      className="product-form__attach-button"
      type="file"
      name="group[group_image]"
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
      { categories && categories.map((category) => 
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