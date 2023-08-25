'use client'

// library
import { useState, useContext } from "react";

// components
import Hamburger from "../hamburger/hamburger.component";
import NavLink from "../nav-link/nav-link.component";
import NavLinks from "../nav-links/nav-links.component";

// context
import { UserContext } from "@/app/contexts/user.context";

const NavMenu = () => {
  // state
  const [ open, setOpen ] = useState(false);
  const { user } = useContext(UserContext);

  // handlers
  const handleHamburgerClick = () => setOpen(!open);
  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="nav-menu">
      <Hamburger onClick={ handleHamburgerClick } />

      <NavLinks open={ open }>
        <NavLink 
          text='Home' 
          href='/' 
          onClick={ handleLinkClick } 
        />

        <NavLink 
          text='Downloads' 
          href='https://brothers-sons.odoo.com/download' 
          onClick={ handleLinkClick } 
        />

        <NavLink 
          text='Contact' 
          href='/contact' 
          onClick={ handleLinkClick } 
        />

        <NavLink 
          text={ user ? 'Admin' : 'Sign In'} 
          href={ user ? '/admin' : '/admin/signin' } 
          onClick={ handleLinkClick } 
        />
      </NavLinks>
    </nav>
  )
}

export default NavMenu;