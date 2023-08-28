// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getCategoryWithProducts } from "@/app/api/categories-api";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  // pre-fetch category details on server
  const response = await getCategoryWithProducts(slug);
  const { name, products } = await response.json();

  return (
    <main className='category-page'>
      <Header text={ name } />
      <CardGrid items={ products } />
    </main>
  )
}

export default CategoryPage;