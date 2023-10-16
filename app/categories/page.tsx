// components
import BlockMenu from '../components/block-menu/block-menu.component';

// types
import { Category } from '../api/api-types';

const Categories = async () => {
  // GET /v1/categories#index
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/categories`
  );
  const { categories }: { categories: Category[] } = await response.json();

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