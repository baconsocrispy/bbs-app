// components
import BlockMenu from '../../_components/block-menu/block-menu.component';
import Grid from '@/app/_components/grid/grid.component';
import Header from '@/app/_components/header/header.component';
import Summary from '../../_components/summary/summary.component';

// api
import { getAllCategories } from '../../api/categories/rails-api';
import { getSummary } from '../../api/summary/rails-api';

// data
import { NAV_TYPES } from '@/app/_components/nav/nav.types';

const Categories = async () => {
  // GET /v1/categories#index
  const categories = await getAllCategories();
  const summary = await getSummary();
  const navOptions = {
    overlay: true,
    theme: NAV_TYPES.light,
    background: NAV_TYPES.transparent
  }

  return (
    <Grid navOptions={ navOptions }>
      <main className='categories-page'>
        <section className='categories-page__header'>
          {
            summary.banner &&
              <Header 
                imageUrl={ summary?.banner.url }
                text={ summary?.bannerText ?? 'Catalog' }
              />
          }
        </section>
        <section className='categories'>
          { categories && <BlockMenu items={ categories } /> }
        </section>
        <section className='mission'>
          { summary && <Summary summary={ summary } /> }
        </section>
      </main>
    </Grid>
  )
};

export default Categories;