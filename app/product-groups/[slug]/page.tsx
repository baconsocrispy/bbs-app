// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// api
import { getGroupWithProducts } from "@/app/api/groups-api";

// data
import { HEADER_VARIANTS } from "@/app/components/header/header.component";

const ProductGroupPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  // load group on server
  const group = await getGroupWithProducts(slug);
  const { name, products, image } = group;

  return (
    <main className='category-page'>
      <Header 
        imageUrl={ image.url }
        text={ name } 
        variant={ HEADER_VARIANTS.overlay }
      />
      <CardGrid items={ products } />
    </main>
  )
};

export default ProductGroupPage;