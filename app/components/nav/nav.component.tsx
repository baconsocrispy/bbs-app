'use client'

// library
import { useContext } from "react";
import Link from "next/link";

// context
import { UserContext } from "@/app/contexts/user.context";

const Nav = () => {
  // state
  const { user } = useContext(UserContext);

  return (
    <div className="nav">
      { user ? 'Log Out' : <Link href='/signin'>Sign In</Link> }
    </div>
  )
}

export default Nav;