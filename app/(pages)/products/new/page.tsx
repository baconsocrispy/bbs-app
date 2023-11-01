// components
import Grid from "@/app/_components/grid/grid.component";
import { ProductFormProvider } from "@/app/_contexts/product-form.context";
import ProductForm from "@/app/_forms/product-form/product-form.component";

const NewProductPage = () => {  
  return (
    <Grid>
      <main className="new-product-page">
        <h1>New Product</h1>
        <ProductFormProvider>
          <ProductForm />
        </ProductFormProvider>
      </main>
    </Grid>
  )
};

export default NewProductPage;