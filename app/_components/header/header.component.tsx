'use client'

// library
import { FC, useState } from "react";

// components
import Image from "next/image";
import Spinner from "../spinner/spinner.component";

// types
type HeaderProps = {
  imageUrl: string;
  text: string;
  variant?: string;
};

// data
export enum HEADER_VARIANTS {
  stacked = 'stacked',
  overlay = 'overlay'
};

const Header: FC<HeaderProps> = ({ 
  imageUrl, text, variant = HEADER_VARIANTS.overlay 
}) => {
  // state
  const [ loading, setLoading ] = useState(true);

  return (
    <>
      { loading && <Spinner /> }
      <section className={ `header header--${ variant }` }>

        <h1 className={ `header__text header__text--${ variant }` }>
          { text }
        </h1>
        <Image
          className={ `header__image header__image--${ variant }` }
          src={ imageUrl } 
          alt={ `${ text }` }
          fill
          priority
          onLoadingComplete={ () => setLoading(false) }
        />
      </section>
    </>
  )
};

export default Header;