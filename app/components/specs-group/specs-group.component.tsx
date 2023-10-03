'use client'

// library
import { FC, MouseEventHandler, MouseEvent, useState } from "react";

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
  const [ specs, setSpecs ] = useState(productSpecs ||= []);
  const [ category, setCategory ] = useState('');
  const [ text, setText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  // handlers
  const handleAddSpec: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    // ensure all fields are filled in
    if ( category === '' || text === '') {
      setErrorMessage('All fields are required')
      return;
    }

    const spec: Spec = { category: category, text: text };
    const newSpecArray = [
      ...specs,
      spec
    ];

    setSpecs(newSpecArray);
    setCategory('');
    setText('');
    setErrorMessage('');
  };

  const handleDeleteSpec = (
    event: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    // prevent form submit
    event.preventDefault();

    // copy specs array
    const updatedSpecs = [ ...specs ];

    // add destroy flag to deleted spec
    updatedSpecs[index] = { ...updatedSpecs[index], _destroy: true };

    setSpecs(updatedSpecs);
  };

  return (
    <section className='specs-group'>
      <h2 className="specs-group__header">Specs</h2>

      <div className="specs-group__form">
        <label 
          className="specs-group__label"
          htmlFor="spec-form-category"
        >
          category*
        </label>
        <input 
          id="spec-form-category"
          className="specs-group__input"
          type="text"
          value={ category }
          onChange={ (e) => setCategory(e.target.value) }
        />
        <label 
          className="specs-group__label"
          htmlFor="spec-form-text"
        >
          text*
        </label>
        <input
          id="spec-form-text"
          className="specs-group__input"
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
        <p className="specs-group__error-message">
          { errorMessage !== '' && errorMessage }
        </p>

        <button 
          className="specs-group__button"
          onClick={ handleAddSpec }
        >
          Add Spec
        </button>
      </div>

      <ul className="specs-group__list">
        <li className="specs-group__item">
          <h3 className="specs-group__list-header">Category</h3>
          <h3 className="specs-group__list-header">Text</h3>
        </li>
        { specs?.map((spec, index) => 
          <li 
            key={ index }
            className={ spec._destroy ? 
              'specs-group__item--deleted' : 'specs-group__item' 
            }
          >
            <input
              id="spec-form-category"
              className="specs-group__category"
              type="text"
              { ...register(`product.specs_attributes.${ index }.category`) }
              value={ spec.category }
              readOnly
            />
            <input
              id="spec-form-text"
              className="specs-group__text"
              type="text"
              { ...register(`product.specs_attributes.${ index }.text`) }
              value={ spec.text }
              readOnly
            />

            { spec.id &&
              <input 
                type="hidden"
                { ...register(`product.specs_attributes.${ index }.id`) }
                value={ spec.id }
              />
            }

            { spec._destroy && 
              <input 
                type="hidden"
                { ...register(`product.specs_attributes.${ index }._destroy`) }
                value={ spec._destroy.toString() }
              />
            }

            <button 
              onClick={ (e) => handleDeleteSpec(e, index) }
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </section>
  )
};

export default SpecsGroup;