// components
import Image from 'next/image';
import Link from 'next/link';

// assets
import LogoImage from '@/public/logo_100x23.png';

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
          src={ LogoImage }
          alt='BB&S Logo'
          priority
        />
      </Link>
    </div>
  )
};

export default Logo;