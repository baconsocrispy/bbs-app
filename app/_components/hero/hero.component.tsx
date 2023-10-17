'use client'

// library
import { FC, useContext } from 'react';

// components
import Button from '../button/button.component';
import Carousel from '../carousel/carousel.component';
import Link from 'next/link';

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
      { user && 
        <button className="block-menu__edit-button">
          <Link 
            className="block-menu__edit-link"
            href={ `/hero-content/edit/${ heroContent.id }`}
          >
            Edit
          </Link>
        </button>
      }

      <Carousel images={ heroContent.images } />

      <div className='hero__content'>
        <h1 className='hero__text'>
          { heroContent.header_text }
        </h1>

        <Button
          text={ heroContent.button_text }
          href={ heroContent.href }
          className='hero__button'
        />
      </div>
    </section>
  )
}

export default Hero;