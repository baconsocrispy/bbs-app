// components
import Image from 'next/image';
import Link from 'next/link';

// assets
import LogoImage from '@/public/logo_100x23.png';

const Logo = () => {
  return (
    <div className="logo">
      <Link href='/'>
        <Image 
          src={ LogoImage }
          alt='BB&S Logo'
          priority
        />
      </Link>
    </div>
  )
}

export default Logo;