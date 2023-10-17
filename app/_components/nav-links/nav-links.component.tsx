// library
import { FC, ReactNode } from 'react';

// types
type NavLinksProps = {
  children: ReactNode;
  open: boolean;
}

const NavLinks: FC<NavLinksProps> = ({ children, open }) => {
  return (
    <ul className={
      open ? 'nav-links' : 'nav-links nav-links--closed'
    }>
      { children }
    </ul>
  )
}

export default NavLinks;