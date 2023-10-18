'use client'

// library
import { FC, MouseEventHandler, useState } from "react";

// components
import Thumbnail from "../thumbnail/thumbnail.component";

// types
import { SerializedImage } from "@/app/api/api-types";

type ImagesInputProps = {
  id?: string;
  images?: SerializedImage[];
  name: string;
};

const ImagesInput: FC<ImagesInputProps> = ({ id, images, name }) => {
  // state
  const [ changeImages, setChangeImages ] = useState(false);

  // handler
  const handleChangeImages: MouseEventHandler = (e) => {
    e.preventDefault();
    setChangeImages(!changeImages);
  };

  return (
    <div className="images-input">
      { (images && !changeImages) &&
          <div className="images-input__thumbnail-container image-display__thumbnail-container">
            { images.map((image) => 
              <Thumbnail 
                key={ image.id } 
                image={ image } 
              />
            )}
          </div>
      }

      { (!images || changeImages) &&
          <input 
            id={ id }
            className="images-input__input"
            type="file"
            name={ name }
            multiple
          />
      }

      { images &&
          <button 
            className="images-input__button"
            onClick={ handleChangeImages }
          >
            { changeImages ? 'Cancel' : 'Change' }
          </button>
      }
    </div>
  )
};

export default ImagesInput;