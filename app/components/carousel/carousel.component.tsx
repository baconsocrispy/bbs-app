'use client'

// library
import { FC, useEffect, useState } from "react";

// types
import { SerializedImage } from "@/app/api/api-types";
import Image from "next/image";

type CarouselProps = {
  images: SerializedImage[];  
}

const Carousel: FC<CarouselProps> = ({ images }) => {
  // state
  const [ activeIndex, setActiveIndex ] = useState(0);
  const onLastSlide = activeIndex === images.length - 1

  // rotate images every 5 seconds
  useEffect(() => {
    const rotateNext = () => {
      const nextIndex = onLastSlide ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const interval = setInterval(rotateNext, 5000);

    // prevent interval memory leak
    return () => clearInterval(interval);

  }, [ activeIndex, onLastSlide ]);

  return (
    <div className="carousel">
     { images?.map((image, index) => 
        <Image 
          key={ image.id }
          src={ image.url }
          alt={ image.filename }
          width={ 1000 }
          height={ 1000 }
          className={ index === activeIndex ? 
            'carousel__image' : 'carousel__image carousel__image--hidden' 
          }
        />
     )}
    </div>
  )
}

export default Carousel;