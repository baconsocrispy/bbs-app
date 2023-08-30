// components
import Header from "@/app/components/header/header.component";

// api
import { getProduct } from "@/app/api/products-api";

const ProductPage = async ({ params }: { params: { id: number }}) => {
  const response = await getProduct(params.id);
  const { name, short_description, product_images } = await response.json();

  return (
    <main className="product-page">
      <Header
        imageUrl={ product_images[0].url }
        text={ name } 
      />

      <div>
        { short_description }
      </div>
    </main>
  )
}

export default ProductPage;