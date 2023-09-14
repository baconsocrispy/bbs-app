// components
import ProductForm from "@/app/components/product-form/product-form.component";

// api
import { getProduct } from "@/app/api/products-api";

const EditProductPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;
  const product = await getProduct(slug);

  return (
    <main>
      <ProductForm product={ product }/>
    </main>
  )
}

export default EditProductPage;