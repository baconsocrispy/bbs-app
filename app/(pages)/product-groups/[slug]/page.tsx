// components
import CardGrid from "@/app/_components/card-grid/card-grid.component";
import Grid from "@/app/_components/grid/grid.component";
import Header from "@/app/_components/header/header.component";

// data
import { NAV_TYPES } from "@/app/_components/nav/nav.types";

// api
import { getGroupWithProducts } from "@/app/api/groups/rails-api";

const ProductGroupPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const group = await getGroupWithProducts(params.slug);

  const { name, products, banner } = group;

  const navOptions = {
    overlay: true,
    background: NAV_TYPES.transparent,
    theme: NAV_TYPES.light
  }

  return (
    <Grid navOptions={ navOptions }>
      <main className='category-page'>
        <Header 
          imageUrl={ banner.url }
          text={ name } 
        />
        <CardGrid items={ products } />
      </main>
    </Grid>
  )
};

export default ProductGroupPage;