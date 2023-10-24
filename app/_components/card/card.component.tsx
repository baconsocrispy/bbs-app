// library
import { FC, useContext } from "react";

// components
import Button from "../button/button.component";
import Image from "next/image";
import Link from "next/link";

// context
import { UserContext } from "@/app/_contexts/user.context";

// types
import { Group, Product } from "@/app/api/api-types";


type CardProps = {
  imageStyle?: string;
  item: Group | Product;
  path?: string | null;
};

const Card: FC<CardProps> = ({ imageStyle, item, path }) => {
  // state
  const { user } = useContext(UserContext)
  const { highlight, image, name, short_description, slug } = item;

  return (
    <div className="card">
      { user && 
        <Button 
          text='Edit'
          href={ `${ path }edit/${ item.slug }` }
          className="button--edit"
        />
      }

      <div className="card__header-container">
        <h2 className="card__header">
          { name }
        </h2>
      </div>

      <div className="card__highlight">
        <p>{ highlight }</p>
      </div>

      <div className="card__image-container">
        <Link 
          className="card__link"
          href={  path + slug }
        >
          <Image 
            className={ `card__image ${ imageStyle }`}
            src={ image?.url } 
            alt={ name }
            width={ 1516 }
            height={ 1516 / 1.91 }
          />
        </Link>
      </div>

      <div className="card__text-container">
        <p className="card__text">
          { short_description }
        </p>
      </div>

      <Link 
        className="card__cta"
        href={ path + slug }
      >
        { 'View ' + name }
      </Link>
    </div>
  )
};

export default Card;