'use client'

// library
import { FC, MouseEventHandler, useEffect } from "react";
import { usePathname } from "next/navigation";

// components
import Link from "next/link";

// types
import { Category } from "@/app/categories/page";
type MenuItem = {
  id: number;
  name: string;
  image_url: string;
  slug: string;  
}

type BlockMenuProps = {
  open: boolean;
  menuItems: MenuItem[] | Category[];
  path?: string;
  onClick?: MouseEventHandler;
}

const BlockMenu: FC<BlockMenuProps> = ({ 
  open, menuItems, path, onClick 
}) => {
  // state
  const pathname = usePathname();

  useEffect(() => {
    console.log(menuItems);
  }, [ menuItems ])

  return (
    <nav className={ open ? 'block-menu' : 'block-menu--closed' }>

      { onClick && 
        <button 
          className='block-menu__close'
          onClick={ onClick }
        >
          X
        </button>
      }

      <ul className='block-menu__items'>
        { menuItems.map(item => {
          return (
            <li 
              key={ item.id } 
              className="block-menu__item" 
              style={{ backgroundImage: `url(${ item.image_url })` }}
            >
              <Link 
                className="block-menu__link" 
                href={ path ? 
                  (path + `/${ item.slug }`) : 
                  (pathname + `/${ item.slug }`) 
                }
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