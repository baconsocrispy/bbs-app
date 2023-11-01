'use client'

// library
import { 
  FC, 
  MouseEvent,
  MouseEventHandler, 
  useContext,
  useState 
} from "react";

import { UseFormRegister } from "react-hook-form";

// context
import { ProductFormContext } from "@/app/_contexts/product-form.context";

// types
import { Feature } from "@/app/api/api-types";
import { ProductFormData } from "../../product-form/product-form.component";


type FeaturesGroupProps = {
  productFeatures?: Feature[];
  register: UseFormRegister<ProductFormData>;
}

const FeaturesGroup: FC<FeaturesGroupProps> = ({ 
  productFeatures, register 
}) => {
  // state
  const [ highlight, setHighlight ] = useState('');
  const [ text, setText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ editIndex, setEditIndex ] = useState<number | undefined>(undefined);
  const { addFeature, removeFeature, updateFeature } = useContext(ProductFormContext);

  // handlers
  const resetForm = () => {
    setHighlight('');
    setText('');
    setErrorMessage('');
  };

  const handleAddFeature: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    // ensure all fields are filled in
    if (text === '') {
      setErrorMessage('Text field is required');
      return;
    }

    const feature: Feature = { highlight: highlight, text: text };
    
    addFeature(feature);
    resetForm();
  };

  const handleDeleteFeature = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    removeFeature(index);
  };

  const handleUpdateFeature = (
    e: MouseEvent<HTMLButtonElement>, 
    index: number
  ) => {
    e.preventDefault();
    editIndex !== index ? setEditIndex(index) : setEditIndex(undefined);
  };

  const handleHighlightChange = (index: number, value: string) => {
    updateFeature({ highlight: value }, index);
  }; 

  const handleTextChange = (index: number, value: string) => {
    updateFeature({ text: value }, index);
  };

  return (
    <section className='features-group'>
      <h2 className="features-group__header">Features</h2>

      <div className="features-group__form">
        {/* highlight */}
        <label
          className="features-group__label" 
          htmlFor="feature-form-highlight"
        >
          highlight
        </label>
        <input 
          id="feature-form-highlight"
          className="features-group__input"
          type="text"
          value={ highlight }
          onChange={ (e) => setHighlight(e.target.value) }
        />

        {/* text */}
        <label 
          className="features-group__label"
          htmlFor="feature-form-text">text*</label>
        <input
          id="feature-form-text"
          className="features-group__input"
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
        <p className="features-group__error-message">
          { errorMessage !== '' && errorMessage }
        </p>
      </div>

      <button 
        className="features-group__button"
        onClick={ handleAddFeature }
      >
        Add Feature
      </button>

      <ul className="features-group__list">
        {/* header row */}
        <li className="features-group__item">
          <h3 className="features-group__list-header">
            Highlight
          </h3>
          <h3 className="features-group__list-header">
            Text
          </h3>
        </li>

        { productFeatures?.map((feature, index) => 
          <li 
            key={ index }
            className={ feature._destroy ? 
              'features-group__item--deleted' : 'features-group__item' 
            }
          >
            <input 
              className="features-group__highlight"
              type="text"
              { ...register(`product.features_attributes.${ index }.highlight`) }
              value={ feature.highlight }
              onChange={ (e) => handleHighlightChange(index, e.target.value) }
              readOnly={ editIndex !== index }
            />

            <input
              className="features-group__text"
              type="text"
              { ...register(`product.features_attributes.${ index }.text`) }
              value={ feature.text }
              onChange={ (e) => handleTextChange(index, e.target.value) }
              readOnly={ editIndex !== index }
            />

            { feature.id &&
              <input 
                type="hidden"
                { ...register(`product.features_attributes.${ index }.id`) }
                value={ feature.id }
              />
            }

            { feature._destroy && 
              <input 
                type="hidden"
                { ...register(`product.features_attributes.${ index }._destroy`) }
                value={ feature._destroy.toString() }
              />
            }

            <button 
              onClick={ (e) => handleDeleteFeature(e, index) }
            >
              Delete
            </button>

            <button 
              onClick={ (e) => handleUpdateFeature(e, index) }
            >
              { editIndex === index ? 'Submit' : 'Edit' }
            </button>                 
          </li>
        )}
      </ul>
    </section>
  )
};

export default FeaturesGroup;