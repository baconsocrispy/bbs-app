// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getCategoryWithGroups } from "@/app/api/categories-api";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  // pre-fetch category details on server
  const category = await getCategoryWithGroups(slug);
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