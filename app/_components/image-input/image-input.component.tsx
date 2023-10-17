'use client'

// library
import { FC, MouseEventHandler, useState } from "react";

// types
import { SerializedImage } from "@/app/api/api-types";
import Thumbnail from "../thumbnail/thumbnail.component";

type ImageInputProps = {
  id?: string;
  image?: SerializedImage;
  name: string;
};

const ImageInput: FC<ImageInputProps> = ({ id, image, name }) => {
  // state
  const [ changeImage, setChangeImage ] = useState(false);

  // handlers
  const handleChangeImage: MouseEventHandler = (e) => {
    e.preventDefault();
    setChangeImage(!changeImage);
  };

  return (
    <div className='image-input'>
      { (image && !changeImage) &&
          <Thumbnail
            className="image-input__thumbnail"
            image={ image } 
          />
      }
      { (!image || changeImage) &&
          <input 
            id={ id ?? '' }
            className="image-input__input"
            type="file"
            name={ name }
          />
      }

      { image && 
        <button 
          className="image-input__button"
          onClick={ handleChangeImage }
        >
          { changeImage ? 'Cancel' : 'Change' }
        </button>
      }
    </div>
  )
}

export default ImageInput