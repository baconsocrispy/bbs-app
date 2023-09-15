// components
import BlockMenu from '../components/block-menu/block-menu.component';
import { Suspense } from 'react';
import Loading from '../loading';

// api
import { getAllCategories } from '../api/categories-api';

const Categories = async () => {
  // server-side api request
  const categories = await getAllCategories();

  return (
    <main className='categories-page'>
      <section className='categories'>
        { categories && 
          <Suspense fallback={ <Loading /> }>
            <BlockMenu 
              open={ true } 
              menuItems={ categories } 
            />
          </Suspense>
        }
      </section>
    </main>
  )
};

export default Categories;