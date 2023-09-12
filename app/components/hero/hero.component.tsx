// library
import { FC } from 'react';

// components
import Carousel from '../carousel/carousel.component';
import Button from '../button/button.component';

// types
import { SerializedImage } from '@/app/api/api-types';

type HeroProps = {
  buttonText: string;
  images: SerializedImage[];
  headerText: string;
  href: string;
}

const Hero: FC<HeroProps> = ({
  buttonText,
  images, 
  headerText,
  href
}) => {
  return (
    <section className='hero'>
      <Carousel images={ images } />

      <div className='hero__content'>
        <h1 className='hero__text'>
          { headerText }
        </h1>

        <Button
          text={ buttonText }
          href={ href }
          className='hero__button'
        />
      </div>
    </section>
  )
}

export default Hero;