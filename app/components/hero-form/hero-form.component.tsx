'use client'

// library
import { useState } from "react";
import { useRouter } from "next/navigation";

// api
import { createHeroContent } from "@/app/api/hero-api";

const HeroForm= () => {
  // state
  const router = useRouter();

  // handler
  const submitHandler = async (formData: FormData) => {
    await createHeroContent(formData);
    router.push('/');
  };

  return (
    <form 
      id="hero_content"
      className="product-form"
      action={ formData => submitHandler(formData) }
    >
      {/* product name */}
      <label 
        className="product-form__label"
        htmlFor="button-text"
      >
        Button Text
      </label>
      <input
        id="button-text" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="hero_content[button_text]"
      />

      {/* product description */}
      <label
        className="product-form__label" 
        htmlFor="header-text"
      >
        Header Text
      </label>
      <input
        id="header-text"
        type="text"
        className="product-form__input" 
        name="hero_content[header_text]"
      />

       {/* product images */}
       <label 
        className="product-form__label"
        htmlFor="href"
      >
        Button Href
      </label>
      <input 
        id="href"
        className="product-form__input"
        type="text"
        name="hero_content[href]"
      />

      {/* product images */}
      <label 
        className="product-form__label"
        htmlFor="product-images"
      >
        Images
      </label>
      <input 
        id="hero-content-images"
        className="product-form__attach-button"
        type="file"
        name="hero_content[hero_images][]"
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
};

export default HeroForm;