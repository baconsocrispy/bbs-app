'use client'

// library
import { FC, useState } from "react";

// components
import Image from "next/image";
import Thumbnail from "../thumbnail/thumbnail.component";


// types
import { SerializedImage } from "@/app/api/api-types";

type ImageDisplayProps = {
  defaultImage: SerializedImage;
  images?: SerializedImage[];
}

const ImageDisplay: FC<ImageDisplayProps> = ({ defaultImage, images }) => {
  // state
  const [ currentImage, setCurrentImage ] = useState<SerializedImage>(defaultImage);

  return (
    <section className="image-display">
      <div className="image-display__image-container">
        <Image
          className="image-display__image" 
          src={ currentImage.url }
          alt={ currentImage.filename }
          width={ 690 }
          height={ 690 }
        />
      </div>

      <div className="image-display__thumbnail-container">
        <Thumbnail 
          image={ defaultImage } 
          onClick={ () => setCurrentImage(defaultImage) }
        />

        { images?.map((image) => 
          <Thumbnail 
            key={ image.id } 
            image={ image } 
            onClick={ () => setCurrentImage(image) }
          />
        )}
      </div>
    </section>
  )
};

export default ImageDisplay;