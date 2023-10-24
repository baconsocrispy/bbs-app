'use client'

// library
import { FC, useEffect, useState } from "react";

// types
import { SerializedImage } from "@/app/api/api-types";
import Image from "next/image";
import Spinner from "../spinner/spinner.component";

type CarouselProps = {
  images: SerializedImage[];
  seconds?: number;  
}

const Carousel: FC<CarouselProps> = ({ images, seconds = 5 }) => {
  // state
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ loading, setLoading ] = useState(true);
  const [ imagesLoaded, setImagesLoaded ] = useState(0);

  const onLastSlide = activeIndex === images.length - 1;

  // show spinner while images load
  useEffect(() => {
    if (imagesLoaded === images.length) {  
      setLoading(false);
    }
  }, [ imagesLoaded, images ]);

  // rotate images every 5 seconds
  useEffect(() => {
    const rotateNext = () => {
      const nextIndex = onLastSlide ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const interval = setInterval(rotateNext, seconds * 1000);

    // prevent interval memory leak
    return () => clearInterval(interval);

  }, [ activeIndex, onLastSlide ]);

  // handler
  const onLoadHandler = () => {
    setImagesLoaded((prevImagesLoaded) => prevImagesLoaded + 1);
  };

  return (
    <>
      { loading && <Spinner /> }
      
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
              onLoadingComplete={ () => onLoadHandler() }
            />
        )}
      </div>
    </>
  )
};

export default Carousel;