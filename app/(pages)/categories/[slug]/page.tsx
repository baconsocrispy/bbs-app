// components
import CardGrid from "@/app/_components/card-grid/card-grid.component";
import Grid from "@/app/_components/grid/grid.component";
import Header from "@/app/_components/header/header.component";
import { NAV_TYPES } from "@/app/_components/nav/nav.types";

// api
import { getCategoryWithGroups } from "@/app/api/categories/rails-api";

const CategoryPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/categories#show
  const category  = await getCategoryWithGroups(params.slug);

  // destructure category elements
  const { name, groups, banner } = category;

  const navOptions = {
    overlay: true,
    background: NAV_TYPES.transparent,
    theme: NAV_TYPES.light
  };

  return (
    <Grid navOptions={ navOptions }>
      <main className='category-page'>
        <Header 
          imageUrl={ banner?.url }
          text={ name } 
        />
        <CardGrid items={ groups } pinnedItem={ category }/>
      </main>
    </Grid>
  )
};

export default CategoryPage;