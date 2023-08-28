// components
import BlockMenu from '../components/block-menu/block-menu.component';

// api
import { getAllCategories } from '../api/categories-api';

// types
export type Category = {
  id: number;
  name: string;
  image_url: string;
  slug: string;
};

const Categories = async () => {
  // server-side api request
  const response = await getAllCategories();
  const categories: Category[] = await response.json();

  return (
    <main className='categories-page'>
      <section>
        { categories && 
          <BlockMenu 
            open={ true } 
            menuItems={ categories } 
          />
        }
      </section>
    </main>
  )
}

export default Categories;