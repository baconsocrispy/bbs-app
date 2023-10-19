'use client'

// library
import { 
  FC, 
  useContext
 } from "react";

// components
import Block from "../block/block.component";
import Link from "next/link";

// context
import { UserContext } from "@/app/_contexts/user.context";

// types
import { Category } from "@/app/api/api-types";

type BlockMenuProps = {
  items: Category[];
};

const BlockMenu: FC<BlockMenuProps> = ({ items }) => {
  // state
  const { user } = useContext(UserContext);

  return (
    <nav className='block-menu'>
      <ul className='block-menu__items'>
        { items?.map((item) => {
          return (
            <li 
              key={ item.id } 
              className="block-menu__item" 
            >
              { user && 
                <button className="block-menu__edit-button">
                  <Link 
                    className="block-menu__edit-link"
                    href={ `/categories/edit/${ item.slug }` }
                  >
                    Edit
                  </Link>
                </button>
              }

              <Block item={ item } />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BlockMenu;