'use client'

// library
import { FC, useContext } from 'react';

// components
import Button from '../button/button.component';
import Carousel from '../carousel/carousel.component';

// context
import { UserContext } from '@/app/_contexts/user.context';

// types
import { HeroContent } from '@/app/api/api-types';

type HeroProps = {
  heroContent: HeroContent;
}

const Hero: FC<HeroProps> = ({ heroContent }) => {
  const { user } = useContext(UserContext);

  return (
    <section className='hero'>


      <Carousel images={ heroContent.images } seconds={ 6 }/>

      <div className='hero__content'>
        { user && 
          <Button 
            text='Edit' 
            href={ `/hero-content/edit/${ heroContent.id }` } 
            className='button--edit'
          />
        }

        <h1 className='hero__text'>
          { heroContent.header_text }
        </h1>

        <Button
          text={ heroContent.button_text }
          href={ heroContent.href }
          className='button--cta'
        />
      </div>
    </section>
  )
}

export default Hero;