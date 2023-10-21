'use client'

// library
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

// components
import ImageInput from "@/app/_components/image-input/image-input.component";

// types
import { Summary } from "@/app/api/api-types";

type SummaryFormProps = {
  summary?: Summary;
}

const SummaryForm: FC<SummaryFormProps> = ({ summary }) => {
  // state
  const [ loading, setLoading ] = useState(false);
  const [ bannerText, setBannerText ] = useState(summary?.bannerText);
  const [ copy, setCopy ] = useState(summary?.copy);
  const [ header, setHeader ] = useState(summary?.header);

  // navigation
  const router = useRouter();

  // handlers
  const submitHandler = async (formData: FormData) => {
    setLoading(true);
    if(summary) {
      const response = await fetch(`/api/summary/${ summary.id }`, {
        credentials: 'include',
        method: 'PUT',
        body: formData
      });
    } else {
      const response = await fetch('/api/summary', {
        credentials: 'include',
        method: 'POST',
        body: formData
      });
    }
    router.push('/');
  };

  if (loading) return <p>Submitting form...</p>;

  return (
    <form 
      id="summary"
      className="product-form"
      action={ formData => submitHandler(formData) }
    >
      {/* header */}
      <label 
        className="product-form__label"
        htmlFor="header-text"
      >
        Header Text
      </label>
      <input
        id="header-text" 
        className="product-form__input"
        type="text"
        autoComplete="false"
        name="summary[header]"
        value={ header }
        onChange={ (e) => setHeader(e.target.value) }
      /> 

      {/* copy text */}
      <label
        className="product-form__label" 
        htmlFor="copy-text"
      >
        Copy Text
      </label>
      <textarea
        id="copy-text"
        className="product-form__input" 
        name="summary[copy]"
        value={ copy }
        onChange={ (e) => setCopy(e.target.value) }
      />

      {/* banner text */}
      <label
        className="product-form__label" 
        htmlFor="banner-text"
      >
        Banner Text
      </label>
      <textarea
        id="banner-text"
        className="product-form__input" 
        name="summary[banner_text]"
        value={ bannerText }
        onChange={ (e) => setBannerText(e.target.value) }
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
        name="summary[banner_image]"
        image={ summary?.banner }
      />

      {/* id */}
      { summary && 
        <input 
          type='hidden'
          name='id'
          value={ summary.id }
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

export default SummaryForm;