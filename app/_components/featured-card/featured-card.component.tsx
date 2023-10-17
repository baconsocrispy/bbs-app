// library
import { Category } from "@/app/api/api-types";
import { FC } from "react";

// components
import Image from "next/image";

// types
type FeaturedCardProps = {
  category: Category;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ category }) => {
  // state
  const { name, pinned, short_description } = category;

  return (
    <section className="card">
      <div className="card__header-container">
        <h2 className="card__header">
          { name }&nbsp;Line
        </h2>
      </div>

      <div className="card__image-container">
        <div className="card__link" style={{ cursor: 'default'}}>
          <Image 
            className="card__image"
            src={ pinned?.url } 
            alt={ name }
            width={ 690 }
            height={ 690 }
          />
        </div>
      </div>

      <div className="card__text-container">
        <p className="card__text">
          { short_description }
        </p>
      </div>
    </section>
  )
};

export default FeaturedCard;