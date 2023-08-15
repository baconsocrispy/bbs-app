// library
import { FC, MouseEventHandler, ReactNode } from "react";

// data
import { Categories } from "../hero/hero.component";

// types
type BlockMenuProps = {
  open: boolean;
  menuItems: Categories;
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
            <li key={ index } className="block-menu__link">
              { item }
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlockMenu;