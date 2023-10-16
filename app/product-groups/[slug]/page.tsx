// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

// types
import { Group } from "@/app/api/api-types";

const ProductGroupPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/groups/${ params.slug }`
  );
  const { group }: { group: Group } = await response.json();

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