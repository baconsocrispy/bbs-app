'use client'

// library
import { 
  FC, 
  MouseEventHandler, 
  useContext,
  useEffect, 
  useState 
 } from "react";

import { usePathname } from "next/navigation";

// components
import Image from "next/image";
import Link from "next/link";
import Spinner from "../spinner/spinner.component";

// context
import { UserContext } from "@/app/_contexts/user.context";

// types
import { Category } from "@/app/api/api-types";

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
  const { user } = useContext(UserContext);
  const pathname = usePathname();
  const [ loading, setLoading ] = useState(true);
  const [ imagesLoaded, setImagesLoaded ] = useState(0);

  // set loading to false when all images load
  useEffect(() => {
    if (imagesLoaded === menuItems.length) {
      setLoading(false);
    }
  }, [ imagesLoaded, menuItems ])

  // handlers
  const onLoadHandler = () => {
    setImagesLoaded((prevImagesLoaded) => prevImagesLoaded + 1);
  };

  return (
    <>
      { loading && <Spinner /> }
      <nav 
        className={ open ? 'block-menu' : 'block-menu--closed' }
      >
      
        { onClick && 
          <button 
            className='block-menu__close'
            onClick={ onClick }
          >
            X
          </button>
        }

        <ul className='block-menu__items'>
          { menuItems?.map((item) => {
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

                <Link 
                  className="block-menu__link" 
                  href={ path ? 
                    (path + `/${ item.slug }`) : 
                    (pathname + `/${ item.slug }`) 
                  }
                > 
                  <Image
                    className="block-menu__image"
                    onLoadingComplete={ () => onLoadHandler() }
                    src={ item.image.url }
                    alt={ item.name }
                    // height={ 690 }
                    // width={ 1600 }
                    fill
                  />

                  <div className="block-menu__header-container">
                    <h4 className="block-menu__header">
                      { item.name }
                    </h4>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default BlockMenu;