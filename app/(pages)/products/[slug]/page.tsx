// components
import Grid from "@/app/_components/grid/grid.component";
import Product from "@/app/_components/product/product.component";

// api
import { getProduct } from "@/app/api/products/rails-api";

const ProductPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/products#show
  const product = await getProduct(params.slug);

  return (
    <Grid>
      <main className="product-page">
        <Product product={ product } />
      </main>
    </Grid>
  )
}

export default ProductPage;