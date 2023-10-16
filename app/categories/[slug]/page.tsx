// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getCategoryWithGroups } from "@/app/api/categories/rails-api";

// types
import { Category } from "@/app/api/api-types";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  const slug = params.slug;

  // GET /v1/categories#show
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/categories/${ slug }`
  );
  const { category } = await response.json();

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