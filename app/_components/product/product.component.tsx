// library
import { FC } from "react";

// components
import Features from "../features/features.component";
import Image from "next/image";
import Specs from "../specs/specs.component";
import TextBlocks from "../text-blocks/text-blocks.component";
import Thumbnail from "../thumbnail/thumbnail.component";

// types
import { Product } from "@/app/api/api-types";
import Link from "next/link";
import Button from "../button/button.component";
import ImageDisplay from "../image-display/image-display.component";

type ProductProps = {
  product: Product;
}

const Product: FC<ProductProps> = ({ product }) => {
  // state
  const { 
    features,
    featuresHeader,
    image, 
    images, 
    name, 
    short_description,
    specs,
    textBlocks
  } = product;

  return (
    <div className="product">
      <h1 className="product__header product__header--mobile">
        { name }
      </h1>
      <ImageDisplay defaultImage={ image } images={ images } />
      
      <section className="product__summary-section">
        <h1 className="product__header product__header--desktop">
          { name }
        </h1>
        <p className="product__short-description">
          { short_description }
        </p>
      </section>

      { specs.length > 0 && <Specs specs={ specs } /> }
      { textBlocks.length > 0 && <TextBlocks textBlocks={ textBlocks } /> }
      { features.length > 0 && <Features features={ features } header={ featuresHeader }/> }

      <Button href="/contact" className="product__cta" text="Inquire" />
    </div>
  )
}

export default Product;