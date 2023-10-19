// components
import BlockMenu from '../_components/block-menu/block-menu.component';
import Summary from '../_components/summary/summary.component';

// api
import { getAllCategories } from '../api/categories/rails-api';
import { getSummary } from '../api/summary/rails-api';

const Categories = async () => {
  // GET /v1/categories#index
  const categories = await getAllCategories();
  const summary = await getSummary();

  return (
    <main className='categories-page'>
      <section className='categories'>
        { categories && <BlockMenu items={ categories } /> }
      </section>
      <section className='mission'>
        { summary && <Summary summary={ summary } /> }
      </section>
    </main>
  )
};

export default Categories;