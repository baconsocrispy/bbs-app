// components
import Image from 'next/image';
import Link from 'next/link';

// types
type LogoProps = {
  theme?: string; // light or dark
};

const Logo = ({ theme }: LogoProps) => {
  return (
    <div className={ `logo ${ theme }` }>
      <Link href='/'>
        <Image 
          className='logo__image'
          src={ '/logo_100x23.png' }
          alt='BB&S Logo'
          width={ 100 }
          height={ 23 }
          priority
        />
      </Link>
    </div>
  )
};

export default Logo;