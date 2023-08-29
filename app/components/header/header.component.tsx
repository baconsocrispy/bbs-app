// library
import { FC } from "react";
import Image from "next/image";

// types
type HeaderProps = {
  image_url: string;
  text: string;
  variant?: string;
};

// data
export enum HEADER_VARIANTS {
  stacked = 'stacked',
  overlay = 'overlay'
};

const Header: FC<HeaderProps> = ({ 
  image_url, text, variant = HEADER_VARIANTS.stacked 
}) => {
  return (
    <section className={ `header header--${ variant }` }>
      <h1 className={ `header__text header__text--${ variant }` }>
        { text }
      </h1>

      <Image
        className={ `header__image header__image--${ variant }` }
        src={ image_url } 
        width={ 100 }
        height={ 100 }
        alt={ `${ text }` }
      />
    </section>
  )
};

export default Header;