'use client'

// library
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// types
import { Category, Group } from "@/app/api/api-types";
import ImageInput from "@/app/_components/image-input/image-input.component";

type GroupFormProps = {
  group?: Group;
};

const GroupForm: FC<GroupFormProps> = ({ group }) => {
  // state
  const [ loading, setLoading ] = useState(false);
  const [ highlight, setHighlight ] = useState(group?.highlight);
  const [ name, setName ] = useState(group?.name);
  const [ short_description, setShortDescription ] = useState(group?.short_description);
  const [ categoryId, setCategoryId ] = useState(group?.categoryId);
  const [ categories, setCategories ] = useState<Category[] | null>(null);

  // navigation
  const router = useRouter();

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch('/api/categories');
      const { categories } = await response.json();
      setCategories(categories);
    };
    getCategories();
  }, []);

  // handlers
  const submitHandler = async (formData: FormData) => {
    setLoading(true);
    try {
      if (group) {
        const response = await fetch(`/api/groups/${ group.slug }`, {
          credentials: 'include',
          method: 'PUT',
          body: formData
        });
      } else {
        const response = await fetch('/api/groups', {
          credentials: 'include',
          method: 'POST',
          body: formData
        });
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGroup: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (group) {
      setLoading(true);
      const response = await fetch(`/api/groups/${ group.slug }`, {
        credentials: 'include',
        method: 'DELETE'
      });
      router.push('/');
    }
  };

  if (loading) return <p>Submitting form...</p>;

  return (
    <form
      id="group"
      className="product-form"
      action={ formData => submitHandler(formData) }
    >
      {/* group name */}
      <label 
        className="product-form__label"
        htmlFor="group-name"
      >
        Name
      </label>
      <input
        id="group-name" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="group[name]"
        value={ name }
        onChange={ (e) => setName(e.target.value) }
      />

      {/* group highlight */}
      <label 
        className="product-form__label"
        htmlFor="group-highlight"
      >
        T
      </label>
      <input
        id="group-highlight" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="group[highlight]"
        value={ highlight }
        onChange={ (e) => setHighlight(e.target.value) }
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
        value={ short_description }
        onChange={ (e) => setShortDescription(e.target.value) }
      />

      {/* group image */}
      <label 
        className="product-form__label"
        htmlFor="group-image"
      >
        Default Image
      </label>
      <ImageInput 
        id="group-image"
        name="group[group_image]"
        image={ group?.image }
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
        name="group[banner_image]"
        image={ group?.banner }
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
        defaultValue={ group?.categoryId }
      >
        { categories?.map((category) => 
          <option 
            key={ category.id } 
            value={ category.id } 
            // selected={ category.id === categoryId }
          >
            { category.name }
          </option>
        )}
      </select>
      
      {/* doorkeeper grant type */}
      <input 
        type='hidden'
        name='grant_type'
        value='password'
      />

      {/* submit button */}
      <button 
        className="product-form__button"
        type='submit'
      >
        Submit
      </button>

      { group &&
        <button 
          className="product-form__button"
          type='submit'
          onClick={ handleDeleteGroup }
        >
          Delete Group
        </button>
      }
    </form>
  )
};

export default GroupForm;