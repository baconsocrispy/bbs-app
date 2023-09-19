// components
import BlockMenu from '../components/block-menu/block-menu.component';

// api
import { getAllCategories } from '../api/categories-api';

const Categories = async () => {
  // server-side api request
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