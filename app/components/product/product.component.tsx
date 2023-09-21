// library
import { FC } from "react";

// components
import Image from "next/image";
import Thumbnail from "../thumbnail/thumbnail.component";

// types
import { Product } from "@/app/api/api-types";

type ProductProps = {
  product: Product;
}

const Product: FC<ProductProps> = ({ product }) => {
  // state
  const { image, images, name, short_description } = product;

  return (
    <section className="product">
      <h1 className="product__header">
        { name }
      </h1>

      <div className="product__image-display">
        <div className="product__image-container">
          <Image
            className="product__image" 
            src={ image?.url }
            alt={ name }
            width={ 500 }
            height={ 500 }
          />
        </div>

        <div className="product__thumbnail-container">
          <Thumbnail image={ image } selected={ false }/>

          { images.length && images.map((image) => 
            <Thumbnail key={ image.id } image={ image } selected={ false }/>
          )}
        </div>
      </div>
      
      <div className="product__text-container">
        <h4 className="product__text-header">description</h4>
        <p className="product__short-description">
          { short_description }
        </p>
      </div>


    </section>
  )
}

export default Product;