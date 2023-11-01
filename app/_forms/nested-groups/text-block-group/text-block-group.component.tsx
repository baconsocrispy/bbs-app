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
import { TextBlock } from "@/app/api/api-types";
import { ProductFormData } from "../../product-form/product-form.component";

type TextBlockGroupProps = {
  productTextBlocks?: TextBlock[];
  register: UseFormRegister<ProductFormData>;
}

const TextBlockGroup: FC<TextBlockGroupProps> = ({ 
  productTextBlocks, register 
}) => {
  // state
  const { addTextBlock, removeTextBlock, updateTextBlock } = useContext(ProductFormContext);
  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ editIndex, setEditIndex ] = useState<number | undefined>(undefined)

  // handlers
  const resetForm = () => {
    setTitle('');
    setText('');
    setErrorMessage('');
  };

  const handleAddTextBlock: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    // ensure fields are filled in
    if (text === '') {
      setErrorMessage('Text field can\'t be blank')
      return;
    }

    const textBlock: TextBlock = { title: title, text: text };
    
    addTextBlock(textBlock);
    resetForm();
  };

  const handleDeleteTextBlock = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    removeTextBlock(index);
  };

  const handleAllowEdit = (
    e: MouseEvent<HTMLButtonElement>, 
    index: number
  ) => {
    e.preventDefault();
    editIndex !== index ? setEditIndex(index) : setEditIndex(undefined);
  };

  const handleTitleChange = (index: number, value: string) => {
    updateTextBlock({ title: value }, index);
  }; 

  const handleTextChange = (index: number, value: string) => {
    updateTextBlock({ text: value }, index);
  };

  return (
    <section className='text-block-group'>
      <h2 className="text-block-group__header">Text Blocks</h2>

      <div className="text-block-group__form">
        {/* title */}
        <label 
          className="text-block-group__label"
          htmlFor="text-block-form-title"
        >title</label>
        <input 
          id="text-block-form-title"
          className="text-block-group__input"
          type="text"
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />

        {/* text */}
        <label 
          className="text-block-group__label"
          htmlFor="text-block-form-text"
        >
          text*
        </label>
        <input
          id="text-block-form-text"
          className="text-block-group__input"
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
        <p className="text-block-group__error-message">
          { errorMessage !== '' && errorMessage }
        </p>
      </div>

      <button 
        className="text-block-group__button"
        onClick={ handleAddTextBlock }
      >
        Add Text Block
      </button>

      <ul className="text-block-group__list">
        <li className="text-block-group__item">
          <h3 className="text-block-group__list-header">Title</h3>
          <h3 className="text-block-group__list-header">Text</h3>
        </li>
        
        { productTextBlocks?.map((textBlock, index) => 
          <li 
            key={ index }
            className={ textBlock._destroy ? 
              'text-block-group__item--deleted' : 'text-block-group__item' 
            }
          >
            <input 
              className="text-block-group__title"
              type="text"
              { ...register(`product.text_blocks_attributes.${ index }.title`) }
              value={ textBlock.title }
              onChange={ (e) => handleTitleChange(index, e.target.value) }
              readOnly={ editIndex !== index }
            />

            <input
              className="text-block-group__text"
              type="text"
              { ...register(`product.text_blocks_attributes.${ index }.text`) }
              value={ textBlock.text }
              onChange={ (e) => handleTextChange(index, e.target.value) }
              readOnly={ editIndex !== index }
            />

            { textBlock.id &&
              <input 
                type="hidden"
                { ...register(`product.text_blocks_attributes.${ index }.id`) }
                value={ textBlock.id }
              />
            }

            { textBlock._destroy && 
              <input 
                type="hidden"
                { ...register(`product.text_blocks_attributes.${ index }._destroy`) }
                value={ textBlock._destroy.toString() }
              />
            }

            <button 
              onClick={ (e) => handleDeleteTextBlock(e, index) }
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

export default TextBlockGroup;