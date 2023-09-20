// library
import { FC, useContext } from "react";

// components
import Button from "../button/button.component";
import Image from "next/image";
import Link from "next/link";

// context
import { UserContext } from "@/app/contexts/user.context";

// types
import { Group, Product } from "@/app/api/api-types";

type CardProps = {
  item: Group | Product;
  path: string | null;
};

const Card: FC<CardProps> = ({ item, path }) => {
  // state
  const { user } = useContext(UserContext)
  const { image, name, short_description, slug } = item;

  return (
    <div className="card">
      { user && 
        <button className="block-menu__edit-button">
          <Link 
            className="block-menu__edit-link"
            href={ `${ path }edit/${ item.slug }` }
          >
            Edit
          </Link>
        </button>
      }

      <div className="card__header-container">
        <h2 className="card__header">
          { name }
        </h2>
      </div>


      <div className="card__image-container">
        <Link 
          className="card__link"
          href={  path + slug }
        >
          <Image 
            className="card__image"
            src={ image.url } 
            alt={ name }
            width={ 690 }
            height={ 690 }
          />
        </Link>
      </div>


      <div className="card__text-container">
        <p className="card__text">
          { short_description }
        </p>
      </div>

      <Button 
        className="card__button"
        href={ path + slug }
        text={ 'View ' + name }
      />

      
    </div>
  )
};

export default Card;