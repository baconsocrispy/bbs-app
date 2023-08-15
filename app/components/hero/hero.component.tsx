'use client'

// library
import { MouseEventHandler, useState } from 'react';

// components
import Button from '../button/button.component';
import BlockMenu from '../block-menu/block-menu.component';

// data
export enum Categories {
  Architecture = "Architecture",
  Film = "Production",
  Studio = "Studio"
}

const Hero = () => {
  // state
  const [ open, setOpen ] = useState(false);

  // handlers
  const handleButtonClick: MouseEventHandler = () => {
    setOpen(!open);
  };

  return (
    <section className='hero'>
      <div className='carousel'></div>

      <BlockMenu 
        open={ open } 
        menuItems={ Categories } 
        onClick={ handleButtonClick }
      />

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