// components
import Product from "@/app/components/product/product.component";

const ProductPage = async ({ params }: { params: { slug: string }}) => {
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/products/${ params.slug }`
  );

  const { product } = await response.json();

  return (
    <main className="product-page">
      <Product product={ product } />
    </main>
  )
}

export default ProductPage;