'use client'

// library
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

// types
import { HeroContent } from "@/app/api/api-types";
import ImagesInput from "@/app/_components/images-input/images-input.component";

type HeroFormProps = {
  heroContent?: HeroContent;
};

const HeroForm: FC<HeroFormProps> = ({ heroContent }) => {
  // state
  const [ loading, setLoading ] = useState(false);
  const [ buttonText, setButtonText ] = useState(heroContent?.button_text);
  const [ headerText, setHeaderText ] = useState(heroContent?.header_text);
  const [ href, setHref ] = useState(heroContent?.href);

  // navigation
  const router = useRouter();

  // handlers
  const submitHandler = async (formData: FormData) => {
    setLoading(true);
    console.log('Submitting form')
    if(heroContent) {
      const response = await fetch(`/api/hero-content/${ heroContent.id }`, {
        credentials: 'include',
        method: 'PUT',
        body: formData
      });
    } else {
      const response = await fetch('/api/hero-content', {
        credentials: 'include',
        method: 'POST',
        body: formData
      });
    }
    router.refresh();
    router.push('/admin');
  };

  if (loading) return <p>Submitting form...</p>;

  return (
    <form 
      id="hero_content"
      className="product-form"
      action={ formData => submitHandler(formData) }
    >
      {/* button text */}
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
        value={ buttonText }
        onChange={ (e) => setButtonText(e.target.value) }
      /> 

      {/* hero-content header text */}
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
        value={ headerText }
        onChange={ (e) => setHeaderText(e.target.value) }
      />

       {/* button link */}
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
        value={ href }
        onChange={ (e) => setHref(e.target.value) }
      />

      {/* hero-content images */}
      <label 
        className="product-form__label"
        htmlFor="hero-content-images"
      >
        Images
      </label>
      <ImagesInput 
        id="hero-content-images"
        images={ heroContent?.images } 
        name="hero_content[hero_images][]"
      />

      {/* id */}
      { heroContent && 
        <input 
          type='hidden'
          name='id'
          value={ heroContent.id }
        />
      }

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