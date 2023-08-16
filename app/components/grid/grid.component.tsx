'use client'

// library
import { FC, ReactNode, useEffect } from 'react';

// types
type GridProps = {
  children: ReactNode;
}

// component
const Grid: FC<GridProps> = ({ children }) => {
  // simulate scroll to hide mobile UI toolbars
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 1);
    }

    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='grid'>
      { children }
    </div>
  )
}

export default Grid;