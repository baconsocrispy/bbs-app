'use client'

// library
import { useEffect, useState } from "react";

// components
import Logo from "../logo/logo.component";
import NavMenu from "../nav-menu/nav-menu.component";

// data
import { NAV_TYPES } from "./nav.types";
import { LOGO_TYPES } from "../logo/logo-types";

// types
type NavProps = {
  background?: string;
  overlay?: boolean;
  theme?: string;
};

const Nav = ({ background, overlay, theme}: NavProps) => {
  // state
  const initialStyle = `
    ${ background }
    ${ overlay && NAV_TYPES.overlay }
    ${ theme }
  `
  const initialLogoStyle = overlay ? LOGO_TYPES.light : LOGO_TYPES.dark;

  const [ navStyle, setNavStyle ] = useState(initialStyle);
  const [ logoStyle, setLogoStyle ] = useState(initialLogoStyle);

  // add scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (mainElement && mainElement.scrollTop > 50) {
        // revert to default background/theme styles on scroll        
        setNavStyle(`${ overlay && NAV_TYPES.overlay }`);
        setLogoStyle(LOGO_TYPES.dark);
      } else {
        setLogoStyle(initialLogoStyle);
        setNavStyle(initialStyle);
      }
    };

    const mainElement = document.querySelector('main');

    mainElement?.addEventListener('scroll', handleScroll);

    return () => {
      mainElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={ 
      `nav ${ navStyle }`
    }>
      <Logo theme={ logoStyle }/>
      <NavMenu />
    </header>
  )
};

export default Nav;