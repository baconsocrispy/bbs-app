'use client'

// library
import { useContext } from "react";

// components
import Logo from "../logo/logo.component";
import NavMenu from "../nav-menu/nav-menu.component";

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
      <NavMenu />
    </div>
  )
}

export default Nav;