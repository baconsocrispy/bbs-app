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
  return (
    <section className="image-display">
      <div className="image-display__image-container">
        <Image
          className="image-display__image" 
          src={ defaultImage.url }
          alt={ defaultImage.filename }
          width={ 500 }
          height={ 500 }
        />
      </div>

      <div className="image-display__thumbnail-container">
        <Thumbnail image={ defaultImage } selected={ false }/>

        { images?.map((image) => 
          <Thumbnail key={ image.id } image={ image } selected={ false }/>
        )}
      </div>
    </section>
  )
};

export default ImageDisplay;