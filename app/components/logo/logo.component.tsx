// components
import Image from 'next/image';

// assets
import LogoImage from '@/public/logo_100x23.png';

const Logo = () => {
  return (
    <div className="logo">
      <Image 
        src={ LogoImage }
        alt='BB&S Logo'
      />
    </div>
  )
}

export default Logo;