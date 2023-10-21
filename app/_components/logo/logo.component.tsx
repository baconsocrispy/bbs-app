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
  const initialStyle = `${ theme }`

  return (
    <div className={ `logo ${ initialStyle }` }>
      <Link href='/'>
        <Image 
          src={ LogoImage }
          alt='BB&S Logo'
          priority
        />
      </Link>
    </div>
  )
};

export default Logo;