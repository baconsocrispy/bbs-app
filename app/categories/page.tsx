// components
import BlockMenu from '../_components/block-menu/block-menu.component';

// api
import { getAllCategories } from '../api/categories/rails-api';

const Categories = async () => {
  // GET /v1/categories#index
  const categories = await getAllCategories();

  return (
    <main className='categories-page'>
      <section className='categories'>
        { categories && 
          <BlockMenu 
            open={ true } 
            menuItems={ categories } 
          />
        }
      </section>
    </main>
  )
};

export default Categories;