// components
import { getCategoryWithGroups } from "@/app/api/categories-api";
import CategoryForm from "@/app/components/category-form/category-form.component"

const CategoryEditPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;
  const category = await getCategoryWithGroups(slug);

  return (
    <main>
      <CategoryForm category={ category }/>
    </main>
  )
}

export default CategoryEditPage