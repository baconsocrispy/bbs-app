'use client'

// library
import { MouseEventHandler, useState } from 'react';

// components
import Button from '../button/button.component';

// data
enum Categories {
  Architecture = "Architecture",
  Film = "Production",
  Studio = "Studio"
}

const Hero = () => {
  // state
  const [ open, setOpen ] = useState(false);

  // handlers
  const handleButtonClick: MouseEventHandler = () => setOpen(!open);

  return (
    <section className='hero'>
      <div className='carousel'></div>

      <div className={ open ? 'block-menu' : 'block-menu--closed' }>
        <button 
          className='block-menu__close' 
          onClick={ handleButtonClick }
        >
          X
        </button>

        <ul className='block__list'>
          <li>{ Categories.Architecture }</li>
          <li>{ Categories.Film }</li>
          <li>{ Categories.Studio }</li>
        </ul>
      </div>
      
      <div className='hero__content'>
        <h1 className='hero__text'>
          Lighting People
        </h1>

        <Button
          text='View Catalog'
          className='hero__button'
          onClick={ handleButtonClick }
        />
      </div>
    </section>
  )
}

export default Hero;