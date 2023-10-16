// components
import Product from "@/app/components/product/product.component";

const ProductPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/products#show
  const response = await fetch(`/api/products/${ params.slug }`);
  const { product } = await response.json();

  return (
    <main className="product-page">
      <Product product={ product } />
    </main>
  )
}

export default ProductPage;