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
import { Spec } from "@/app/api/api-types";
import { ProductFormData } from "../../product-form/product-form.component";

type SpecsGroupProps = {
  productSpecs?: Spec[];
  register: UseFormRegister<ProductFormData>;
}

const SpecsGroup: FC<SpecsGroupProps> = ({ 
  productSpecs, register 
}) => {
  // state
  const { addSpec, removeSpec, updateSpec } = useContext(ProductFormContext);
  const [ category, setCategory ] = useState('');
  const [ text, setText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ editIndex, setEditIndex ] = useState<number | undefined>(undefined);

  // handlers
  const resetForm = () => {
    setCategory('');
    setText('');
    setErrorMessage('');
  };

  const handleAddSpec: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    // ensure all fields are filled in
    if ( category === '' || text === '') {
      setErrorMessage('All fields are required')
      return;
    }

    const spec: Spec = { category: category, text: text };

    addSpec(spec);
    resetForm();
  };

  const handleDeleteSpec = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    // prevent form submit
    e.preventDefault();
    removeSpec(index);
  };

  const handleAllowEdit = (
    e: MouseEvent<HTMLButtonElement>, 
    index: number
  ) => {
    e.preventDefault();
    editIndex !== index ? setEditIndex(index) : setEditIndex(undefined);
  };

  const handleCategoryChange = (index: number, value: string) => {
    updateSpec({ category: value }, index);
  }; 

  const handleTextChange = (index: number, value: string) => {
    updateSpec({ text: value }, index);
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
        {/* header row */}
        <li className="specs-group__item">
          <h3 className="specs-group__list-header">Category</h3>
          <h3 className="specs-group__list-header">Text</h3>
        </li>

        { productSpecs?.map((spec, index) => 
          <li 
            key={ index }
            className={ spec._destroy ? 
              'specs-group__item--deleted' : 'specs-group__item' 
            }
          >
            <input
              className="specs-group__category"
              type="text"
              { ...register(`product.specs_attributes.${ index }.category`) }
              value={ spec.category }
              onChange={ (e) => handleCategoryChange(index, e.target.value)}
              readOnly={ editIndex !== index }
            />
            <input
              className="specs-group__text"
              type="text"
              { ...register(`product.specs_attributes.${ index }.text`) }
              value={ spec.text }
              onChange={ (e) => handleTextChange(index, e.target.value)}
              readOnly={ editIndex !== index }
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

            <button 
              onClick={ (e) => handleAllowEdit(e, index) }
            >
              { editIndex === index ? 'Confirm' : 'Edit' }
            </button>       
          </li>
        )}
      </ul>
    </section>
  )
};

export default SpecsGroup;