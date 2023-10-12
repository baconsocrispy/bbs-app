// components
import ProductForm from "@/app/components/product-form/product-form.component";

const EditProductPage = async ({ params }: { params: { slug: string }}) => {
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/products/${ params.slug }`
  );

  const { product } = await response.json();

  return (
    <main className="edit-product-page">
      <ProductForm product={ product }/>
    </main>
  )
};

export default EditProductPage;