// components
import Product from "@/app/components/product/product.component";

// api
import { getProduct } from "@/app/api/products-api";

const ProductPage = async ({ params }: { params: { id: number }}) => {
  const product = await getProduct(params.id);

  return (
    <main className="product-page">
      <Product product={ product } />
    </main>
  )
}

export default ProductPage;