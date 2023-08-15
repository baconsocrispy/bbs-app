'use client'

// library
import { useState } from "react";

// components
import Hamburger from "../hamburger/hamburger.component";
import NavLink from "../nav-link/nav-link.component";
import NavLinks from "../nav-links/nav-links.component";

const NavMenu = () => {
  // state
  const [ open, setOpen ] = useState(false);

  // handlers
  const handleHamburgerClick = () => setOpen(!open);
  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="nav-menu">
      <Hamburger onClick={ handleHamburgerClick } />

      <NavLinks open={ open }>
        <NavLink text='Home' href='/' onClick={ handleLinkClick } />
        <NavLink text='Admin' href='/admin' onClick={ handleLinkClick } />
        <NavLink text='Contact' href='/contact' onClick={ handleLinkClick } />
        <NavLink text='Sign In' href='/admin/signin' onClick={ handleLinkClick } />
      </NavLinks>
    </nav>
  )
}

export default NavMenu;