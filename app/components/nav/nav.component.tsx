'use client'

// library
import { useContext } from "react";

// components
import Link from "next/link";
import Logo from "../logo/logo.component";

// context
import { UserContext } from "@/app/contexts/user.context";

const Nav = () => {
  // state
  const { user } = useContext(UserContext);

  return (
    <div className="nav">
      <Logo />
      { user ? 'Log Out' : <Link href='/signin'>Sign In</Link> }
    </div>
  )
}

export default Nav;