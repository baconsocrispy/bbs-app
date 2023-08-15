// library
import { FC, MouseEventHandler, ReactNode } from "react";

// components
import Link from "next/link";

// data
import { Categories } from "../hero/hero.component";

// types
type BlockMenuProps = {
  open: boolean;
  menuItems: typeof Categories;
  onClick: MouseEventHandler;
}

const BlockMenu: FC<BlockMenuProps> = ({ open, menuItems, onClick }) => {
  return (
    <nav className={ open ? 'block-menu' : 'block-menu--closed' }>
      <button 
        className='block-menu__close'
        onClick={ onClick }
      >
        X
      </button>

      <ul className='block-menu__links'>
        { Object.values(menuItems).map((item, index) => {
          return (
            <li key={ index }>
              <Link 
                className="block-menu__link" 
                href={ `/categories/${ item }` }
              >
                { item }
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlockMenu;