// components
import ProductForm from "@/app/components/product-form/product-form.component";

// api
import { getProduct } from "@/app/api/products/rails-api";

const EditProductPage = async ({ params }: { params: { slug: string }}) => {

  const product = await getProduct(params.slug);

  return (
    <main className="edit-product-page">
      <ProductForm product={ product }/>
    </main>
  )
};

export default EditProductPage;