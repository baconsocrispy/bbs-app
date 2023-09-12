// components
import Image from "next/image";

// api
import { getProduct } from "@/app/api/products-api";

const ProductPage = async ({ params }: { params: { id: number }}) => {
  const product = await getProduct(params.id);
  const { name, short_description, image } = product;

  return (
    <main className="product-page">
      <h1>{ name }</h1>

      <div className="product-image__container">
        <Image
          className="product-image" 
          src={ image.url }
          alt={ name }
          width={ 500 }
          height={ 500 }
        />
      </div>

      <div>
        { short_description }
      </div>
    </main>
  )
}

export default ProductPage;