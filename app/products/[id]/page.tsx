// components
import Header from "@/app/components/header/header.component";

// api
import { getProduct } from "@/app/api/products-api";

const ProductPage = async ({ params }: { params: { id: number }}) => {
  const response = await getProduct(params.id);
  const { name, short_description } = await response.json();

  return (
    <div className="product-page">
      <Header image_url='/product.jpg' text={ name } />
      <div>
        { name }
      </div>
      <div>
        { short_description }
      </div>
    </div>
  )
}

export default ProductPage;