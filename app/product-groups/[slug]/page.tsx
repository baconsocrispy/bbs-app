// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getGroupWithProducts } from "@/app/api/groups/rails-api";

const ProductGroupPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const group = await getGroupWithProducts(params.slug);

  const { name, products, banner } = group;

  return (
    <main className='category-page'>
      <Header 
        imageUrl={ banner.url }
        text={ name } 
      />
      <CardGrid items={ products } />
    </main>
  )
};

export default ProductGroupPage;