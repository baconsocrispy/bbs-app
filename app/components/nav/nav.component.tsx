'use client'

// library
import { useContext } from "react";

// components
import Hamburger from "../hamburger/hamburger.component";
import Logo from "../logo/logo.component";

// context
import { UserContext } from "@/app/contexts/user.context";

const Nav = () => {
  // state
  const { user } = useContext(UserContext);

  // handlers
  const handleHamburgerClick = () => console.log('test');

  return (
    <div className="nav">
      <Logo />
      <Hamburger onClick={ handleHamburgerClick }/>
    </div>
  )
}

export default Nav;