'use client'

// library
import { FC, MouseEventHandler, useState } from "react";

// types
import { Spec } from "@/app/api/api-types";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { ProductFormData } from "../product-form/product-form.component";

type SpecsGroupProps = {
  productSpecs?: Spec[];
  register: UseFormRegister<ProductFormData>;
  unregister: UseFormUnregister<ProductFormData>;
}

const SpecsGroup: FC<SpecsGroupProps> = ({ 
  productSpecs, register, unregister 
}) => {
  // state
  const [ specs, setSpecs ] = useState(productSpecs ? productSpecs : []);
  const [ category, setCategory ] = useState('');
  const [ text, setText ] = useState('');

  // handlers
  const handleAddSpec: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    const spec: Spec = { category: category, text: text };
    const newSpecArray = [
      ...specs,
      spec
    ];

    setSpecs(newSpecArray);
    setCategory('');
    setText('');
  };

  return (
    <section className='specs-group'>
      <h2>Specs</h2>

      <div className="spec-form">
        <label htmlFor="">category</label>
        <input 
          type="text"
          value={ category }
          onChange={ (e) => setCategory(e.target.value) }
        />
        <label htmlFor="">text</label>
        <input
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
      </div>

      <button onClick={ handleAddSpec }>
        Add Spec
      </button>

      <ul>
        { specs?.map((spec, index) => 
          <li key={ index }>
            <div className="spec-form">
              <label htmlFor="">
                category
              </label>
              <input 
                type="text"
                { ...register(`product.specs_attributes.${ index }.category`) }
                value={ spec.category }
              />
              <label htmlFor="">text</label>
              <input
                type="text"
                { ...register(`product.specs_attributes.${ index }.text`) }
                value={ spec.text }
              />

              { spec.id &&
                <input 
                  type="hidden"
                  { ...register(`product.specs_attributes.${ index }.id`) }
                  value={ spec.id }
                />
              }
            </div>
          </li>
        )}
      </ul>
    </section>
  )
};

export default SpecsGroup;