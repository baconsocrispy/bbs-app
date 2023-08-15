'use client'

// library
import { useState } from 'react';

// data
enum Categories {
  Architecture = "Architecture",
  Film = "Production",
  Studio = "Studio"
}

const CategoryMenu = () => {
  // state
  const [ open, setOpen ] = useState(false);

  return (
    <div>CategoryMenu</div>
  )
}

export default CategoryMenu;