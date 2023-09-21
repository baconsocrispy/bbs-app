'use client'

// library
import { FC, MouseEventHandler, useState } from "react";

// types
import { TextBlock } from "@/app/api/api-types";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { ProductFormData } from "../product-form/product-form.component";

type TextBlockGroupProps = {
  productTextBlocks?: TextBlock[];
  register: UseFormRegister<ProductFormData>;
  unregister: UseFormUnregister<ProductFormData>;
}

const TextBlockGroup: FC<TextBlockGroupProps> = ({ 
  productTextBlocks, register, unregister 
}) => {
  // state
  const [ textBlocks, setTextBlocks ] = useState(productTextBlocks ? productTextBlocks : []);
  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  // handlers
  const handleAddTextBlock: MouseEventHandler = (e) => {
    // prevent form submit
    e.preventDefault();

    // ensure fields are filled in
    if (text === '') {
      setErrorMessage('Text field can\'t be blank')
      return;
    }

    const textBlock: TextBlock = { title: title, text: text };
    const newTextBlockArray = [
      ...textBlocks,
      textBlock
    ];

    setTextBlocks(newTextBlockArray);
    setTitle('');
    setText('');
    setErrorMessage('');
  };

  return (
    <section className='product-form__section'>
      <h2>Text Blocks</h2>

      <div className="text-block-form">
        <label htmlFor="">title</label>
        <input 
          type="text"
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />
        <label htmlFor="">text</label>
        <input
          type="text"
          value={ text }
          onChange={ (e) => setText(e.target.value) }
        />
        <p>{ errorMessage !== '' && errorMessage }</p>
      </div>

      <button onClick={ handleAddTextBlock }>
        Add Text Block
      </button>

      <ul>
        { textBlocks?.map((textBlock, index) => 
          <li key={ index }>
            <div className="text-block-form">
              <label htmlFor="">
                title
              </label>
              <input 
                type="text"
                { ...register(`product.text_blocks_attributes.${ index }.title`) }
                value={ textBlock.title }
              />
              <label htmlFor="">text</label>
              <input
                type="text"
                { ...register(`product.text_blocks_attributes.${ index }.text`) }
                value={ textBlock.text }
              />

              { textBlock.id &&
                <input 
                  type="hidden"
                  { ...register(`product.text_blocks_attributes.${ index }.id`) }
                  value={ textBlock.id }
                />
              }
            </div>
          </li>
        )}
      </ul>
    </section>
  )
};

export default TextBlockGroup;