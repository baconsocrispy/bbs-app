// components
import Button from '../button/button.component';

const Hero = () => {
  return (
    <section className='hero'>
      <div className='carousel'></div>

      <div className='hero__content'>
        <h1 className='hero__text'>
          Lighting People
        </h1>

        <Button
          text='View Catalog'
          href='/categories'
          className='hero__button'
        />
      </div>
    </section>
  )
}

export default Hero;