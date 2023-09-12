'use client'

// library
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// api
import { createProduct } from "../../api/products-api";
import { getAllGroups } from "@/app/api/groups-api";

// types
import { Group } from "@/app/api/api-types";

const ProductForm= () => {
  // state
  const [ loading, setLoading ] = useState(true);
  const [ groups, setCategories ] = useState<Group[] | null>(null);
  const router = useRouter();

  // load groups
  useEffect(() => {
    const getGroups = async () => {
      const groups = await getAllGroups();
      setCategories(groups);
    };

    groups ? setLoading(false) : getGroups();
  }, [ groups ]);

  // handler
  const submitHandler = async (formData: FormData) => {
    await createProduct(formData);
    router.push('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form 
      id="product"
      className="product-form"
      action={ formData => submitHandler(formData) }
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
        htmlFor="product-default-image"
      >
        Default Image
      </label>
      <input 
        id="product-default-image"
        className="product-form__attach-button"
        type="file"
        name="product[default_image]"
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

      {/* group id */}
      <label htmlFor="group-select">
        Product Group
      </label>
      <select
        id="group-select"
        className="product-form__select"
        name="product[group_id]"
      >
        { groups?.map((group) => 
          <option key={ group.id } value={ group.id }>
            { group.name }
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
};

export default ProductForm;