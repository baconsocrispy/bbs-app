// library
import { FC } from "react";
import Image from "next/image";

// assets
import ProductImage from '@/public/product.jpg';

// types
type Item = {
  id: number;
  name: string;
}

type CardProps = {
  item: Item;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <div className="card">
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
    </div>
  )
}

export default Card;