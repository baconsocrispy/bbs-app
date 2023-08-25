'use client'

// library
import { useState, useEffect } from 'react';

// components
import BlockMenu from '../components/block-menu/block-menu.component'

// api
import { getAllCategories } from '../api/categories-api';

// types
type Category = {
  id: number;
  name: string;
  image_url: string;  
};

const Categories = () => {
  // state
  const [ categories, setCategories ] = useState<Category[] | null>(null);

  // api call to get and set categories
  useEffect(() => {
    const getCategories = async () => {
      const response = await getAllCategories();
      const categoryArray: Category[] = await response.json();
      setCategories(categoryArray);
    };
    getCategories();
  }, [])

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

export default Categories