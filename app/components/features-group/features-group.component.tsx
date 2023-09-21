'use client'

// library
import { FC, MouseEventHandler, useState } from "react";

// types
import { Feature } from "@/app/api/api-types";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { ProductFormData } from "../product-form/product-form.component";

type FeaturesGroupProps = {
  productFeatures?: Feature[];
  register: UseFormRegister<ProductFormData>;
  unregister: UseFormUnregister<ProductFormData>;
}

const FeaturesGroup: FC<FeaturesGroupProps> = ({ 
  productFeatures, register, unregister 
}) => {
  // state
  const [ features, setFeatures ] = useState(productFeatures ? productFeatures : []);
  const [ highlight, setHighlight ] = useState('');
  const [ text, setText ] = useState('');

  // handlers
  const handleAddFeature: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    const feature: Feature = { highlight: highlight, text: text };
    const newFeatureArray = [
      ...features,
      feature
    ];

    setFeatures(newFeatureArray);
    setHighlight('');
    setText('');
  };

  return (
    <section className='features-group'>
      <h2>Features</h2>

      <div className="feature-form">
        <label htmlFor="">highlight</label>
        <input 
          type="text"
          value={ highlight }
          onChange={ (e) => setHighlight(e.target.value) }
        />
        <label htmlFor="">text</label>
        <input
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
      </div>

      <button onClick={ handleAddFeature }>
        Add Feature
      </button>

      <ul>
        { features?.map((feature, index) => 
          <li key={ index }>
            <div className="feature-form">
              <label htmlFor="">
                highlight
              </label>
              <input 
                type="text"
                { ...register(`product.features_attributes.${ index }.highlight`) }
                value={ feature.highlight }
              />
              <label htmlFor="">text</label>
              <input
                type="text"
                { ...register(`product.features_attributes.${ index }.text`) }
                value={ feature.text }
              />

              { feature.id &&
                <input 
                  type="hidden"
                  { ...register(`product.features_attributes.${ index }.id`) }
                  value={ feature.id }
                />
              }
            </div>
          </li>
        )}
      </ul>
    </section>
  )
};

export default FeaturesGroup;