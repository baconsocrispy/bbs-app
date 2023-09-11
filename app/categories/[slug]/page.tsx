// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getCategoryWithProducts } from "@/app/api/categories-api";

// data
import { HEADER_VARIANTS } from "@/app/components/header/header.component";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  // pre-fetch category details on server
  const category = await getCategoryWithProducts(slug);
  const { name, groups, categoryImage } = category;

  return (
    <main className='category-page'>
      <Header 
        imageUrl={ categoryImage.url }
        text={ name } 
        variant={ HEADER_VARIANTS.overlay }
      />
      <CardGrid items={ groups } />
    </main>
  )
}

export default CategoryPage;