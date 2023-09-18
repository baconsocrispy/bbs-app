'use client'

// library
import { FC, MouseEventHandler } from "react";
import { usePathname } from "next/navigation";

// components
import Link from "next/link";

// types
import { Category } from "@/app/api/api-types";
import Image from "next/image";

type BlockMenuProps = {
  open: boolean;
  menuItems: Category[];
  path?: string;
  onClick?: MouseEventHandler;
};

const BlockMenu: FC<BlockMenuProps> = ({ 
  open, menuItems, path, onClick 
}) => {
  // state
  const pathname = usePathname();

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
        { menuItems?.map(item => {
          return (
            <li 
              key={ item.id } 
              className="block-menu__item" 
            >
              <Link 
                className="block-menu__link" 
                href={ path ? 
                  (path + `/${ item.slug }`) : 
                  (pathname + `/${ item.slug }`) 
                }
              > 
                <Image
                  className="block-menu__image"
                  src={ item.image.url }
                  alt={ item.name }
                  fill
                />

                <div className="block-menu__header-container">
                  <h4 className="block-menu__header">
                    { item.name }
                  </h4>
                </div>
                
                <div className="block-menu__text-container">
                  <p className="block-menu__text">
                    { item.short_description }
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlockMenu;