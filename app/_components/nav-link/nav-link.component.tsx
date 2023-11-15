// library
import { FC, MouseEventHandler } from 'react';

// components
import Link from 'next/link';

// types
type NavLinkProps = {
  text: string;
  href: string;
  onClick?: MouseEventHandler;
  newTab?: boolean;
};

const NavLink: FC<NavLinkProps> = ({ text, href, onClick, newTab }) => {
  return (
    <li onClick={ onClick } className='nav-link'>
      <Link 
        href={ href } 
        target={ newTab ? '_blank' : undefined }
      >
        { text }
      </Link>
    </li>
  )
};

export default NavLink;