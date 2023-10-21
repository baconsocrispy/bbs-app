// components
import CategoryForm from "@/app/_forms/category-form/category-form.component";
import Grid from "@/app/_components/grid/grid.component";

const NewCategoryPage = () => {
  return (
    <Grid>
      <main>
        <h1>New Category</h1>
        <CategoryForm />
      </main>
    </Grid>
  )
};

export default NewCategoryPage;