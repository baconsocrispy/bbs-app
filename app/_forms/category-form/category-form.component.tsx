'use client'
// library
import { FC, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

// types
import { Category } from "@/app/api/api-types";
import ImageInput from "@/app/_components/image-input/image-input.component";

type CategoryFormProps = {
  category?: Category;
}

const CategoryForm: FC<CategoryFormProps> = ({ category }) => {
  // state
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState(category?.name);
  const [ short_description, setShortDescription ] = useState(category?.short_description);
  const [ tagLine, setTagLine ] = useState(category?.tagLine);
  const [ title, setTitle ] = useState(category?.title)

  // navigation
  const router = useRouter();

  // handlers
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (category) {
        const response = await fetch(`/api/categories/${ category.slug }`, {
          credentials: 'include',
          method: 'PUT',
          body: formData
        });
      } else {
        const response = await fetch('/api/categories', {
          credentials: 'include',
          method: 'POST',
          body: formData
        });
      }
      router.push('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDeleteCategory: MouseEventHandler = async (e) => {
    // prevent form submit
    e.preventDefault();
    if (category) {
      setLoading(true);
      const response = await fetch(`/api/categories/${ category.slug }`, {
        method: 'DELETE'
      });
      router.push('/');
    }
  };

  if (loading) return <p>Submitting form...</p>;

  return (
    <form
      id="category"
      className="product-form"
      action={ formData => handleSubmit(formData) }
    >
      {/* category name */}
      <label 
        className="product-form__label"
        htmlFor="category-name"
      >
        Name
      </label>
      <input
        id="category-name" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="category[name]"
        value={ name }
        onChange={ (e) => setName(e.target.value) }
      />

      {/* category title */}
      <label 
        className="product-form__label"
        htmlFor="category-title"
      >
        Title
      </label>
      <input
        id="category-title" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="category[title]"
        value={ title }
        onChange={ (e) => setTitle(e.target.value) }
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

      {/* category tag line */}
      <label
        className="product-form__label" 
        htmlFor="tag-line"
      >
        Tag Line
      </label>
      <input
        id="tag-line"
        className="product-form__input" 
        name="category[tag_line]"
        value={ tagLine }
        onChange={ (e) => setTagLine(e.target.value) }
      />

      {/* default image */}
      <label 
        className="product-form__label"
        htmlFor="default-image"
      >
        Default Image
      </label>
      <ImageInput 
        id='default-image'
        name="category[category_image]"
        image={ category?.image }
      />

      {/* banner image */}
      <label 
        className="product-form__label"
        htmlFor="banner-image"
      >
        Banner Image
      </label>
      <ImageInput
        id="banner-image"
        name="category[banner_image]"
        image={ category?.banner }
      />

      {/* pinned image */}
      <label 
        className="product-form__label"
        htmlFor="pinned-image"
      >
        Pinned Image
      </label>
      <ImageInput 
        id="pinned-image"
        name="category[pinned_image]"
        image={ category?.pinned }
      />

      {/* doorkeeper grant type */}
      <input 
        type='hidden'
        name="grant_type"
        value="password"
      />

      {/* submit button */}
      <button 
        className="product-form__button"
        type='submit'
      >
        Submit
      </button>

      { category &&
        <button 
          className="product-form__button"
          type='submit'
          onClick={ handleDeleteCategory }
        >
          Delete Category
        </button>
      }
    </form>
  )
};

export default CategoryForm;