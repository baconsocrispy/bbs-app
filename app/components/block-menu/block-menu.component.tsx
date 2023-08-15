// library
import { FC, MouseEventHandler, ReactNode } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { Category } from "@/app/api/categories";

type BlockMenuProps = {
  open: boolean;
  menuItems: Category[];
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

      <ul className='block-menu__items'>
        { menuItems.map(item => {
          return (
            <li 
              key={ item.id } 
              className="block-menu__item" 
              style={{ backgroundImage: `url(${ item.image })` }}
            >
              <Link 
                className="block-menu__link" 
                href={ `/categories/${ item.name }` }
              >
                { item.name }
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlockMenu;