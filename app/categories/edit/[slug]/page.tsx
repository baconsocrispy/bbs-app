// components
import CategoryForm from "@/app/components/category-form/category-form.component";

//types
import { Category } from "@/app/api/api-types";


const CategoryEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/categories#show
  const response = await fetch(
    `/api/categories/${ params.slug }`
  );
  const { category } = await response.json();

  return (
    <main>
      <CategoryForm category={ category }/>
    </main>
  )
}

export default CategoryEditPage;