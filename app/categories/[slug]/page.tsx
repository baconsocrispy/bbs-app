// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getCategoryWithGroups } from "@/app/api/categories/rails-api";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/categories#show
  const category  = await getCategoryWithGroups(params.slug);

  // destructure category elements
  const { name, groups, banner } = category;

  return (
    <main className='category-page'>
      <Header 
        imageUrl={ banner?.url }
        text={ name } 
      />
      <CardGrid items={ groups } pinnedItem={ category }/>
    </main>
  )
};

export default CategoryPage;