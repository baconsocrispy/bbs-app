// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getGroupWithProducts } from "@/app/api/groups-api";

const ProductGroupPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  // load group on server
  const group = await getGroupWithProducts(slug);
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