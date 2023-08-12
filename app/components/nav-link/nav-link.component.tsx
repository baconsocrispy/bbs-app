// library
import { FC, MouseEventHandler } from 'react';

// components
import Link from 'next/link';

// types
type NavLinkProps = {
  text: string;
  href: string;
  onClick?: MouseEventHandler;
};

const NavLink: FC<NavLinkProps> = ({ text, href, onClick }) => {
  return (
    <li onClick={ onClick }>
      <Link href={ href } className=''>
        { text }
      </Link>
    </li>
  )
};

export default NavLink;