'use client'

// library
import { 
  FC, 
  useContext
 } from "react";

// components
import Block from "../block/block.component";
import Button from "../button/button.component";

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
                <Button 
                  text='Edit'
                  href={ `/categories/edit/${ item.slug }` }
                  className="button--edit"
                />
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