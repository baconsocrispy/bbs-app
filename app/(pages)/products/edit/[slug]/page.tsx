// context
import { ProductFormProvider } from "@/app/_contexts/product-form.context";

// components
import Grid from "@/app/_components/grid/grid.component";
import ProductForm from "@/app/_forms/product-form/product-form.component";

// api
import { getProduct } from "@/app/api/products/rails-api";

const EditProductPage = async ({ params }: { params: { slug: string }}) => {

  const product = await getProduct(params.slug);

  return (
    <Grid>
      <main className="edit-product-page">
        <ProductFormProvider>
          <ProductForm product={ product }/>
        </ProductFormProvider>
      </main>
    </Grid>
  )
};

export default EditProductPage;