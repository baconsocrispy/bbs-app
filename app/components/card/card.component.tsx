// library
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// components
import Button from "../button/button.component";

// types
import { Group } from "@/app/api/api-types";
type CardProps = {
  item: Group;
  path?: string;
}

const Card: FC<CardProps> = ({ item, path }) => {
  return (
    <div className="card">
      <div className="card__header-container">
        <h4 className="card__header">
          { item.name }
        </h4>
      </div>

      <Link 
        className="card__link"
        href={ '/' }>
        <div className="card__image-container">
          <Image 
            className="card__image"
            src={ item.image.url } 
            alt={ item.name + ' group' }
            width={ 500 }
            height={ 500 }
          />
        </div>
      </Link>

      <div className="card__text-container">
        <p className="card__text">
          { item.short_description }
        </p>
      </div>

      <Button 
        className="card__button"
        href={ "/" }
        text={ 'Explore ' + item.name }
      />
    </div>
  )
}

export default Card;