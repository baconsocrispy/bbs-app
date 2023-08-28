// library
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// assets
import ProductImage from '@/public/product.jpg';

// types
type Item = {
  id: number;
  name: string;
}

type CardProps = {
  item: Item;
  path?: string;
}

const Card: FC<CardProps> = ({ item, path }) => {
  return (
    <div className="card">
      <Link 
        className="card__link"
        href={ path ?  
          `${ path + '/' + item.id }` :
          `/${ item.id }`
      }>
        <div className="card__image-container">
          <Image 
            className="card__image"
            src={ ProductImage } 
            alt="Temp Image" 
          />
        </div>
        <div className="card__header-container">
          <h4 className="card__header">
            { item.name }
          </h4>
        </div>
      </Link>
    </div>
  )
}

export default Card;