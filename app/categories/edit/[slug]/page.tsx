// components
import CategoryForm from "@/app/_forms/category-form/category-form.component";

// api
import { getCategoryWithGroups } from "@/app/api/categories/rails-api";


const CategoryEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/categories#show
  const category = await getCategoryWithGroups(params.slug);

  return (
    <main className="category-edit-page">
      <CategoryForm category={ category }/>
    </main>
  )
}

export default CategoryEditPage;