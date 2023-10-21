// components
import CategoryForm from "@/app/_forms/category-form/category-form.component";
import Grid from "@/app/_components/grid/grid.component";

// api
import { getCategoryWithGroups } from "@/app/api/categories/rails-api";


const CategoryEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/categories#show
  const category = await getCategoryWithGroups(params.slug);

  return (
    <Grid>
      <main className="category-edit-page">
        <CategoryForm category={ category }/>
      </main>
    </Grid>
  )
};

export default CategoryEditPage;