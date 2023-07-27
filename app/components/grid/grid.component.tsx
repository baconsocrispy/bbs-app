// library
import { FC, ReactNode } from 'react';

// types
type GridProps = {
  children: ReactNode;
}

// component
const Grid: FC<GridProps> = ({ children }) => {
  return (
    <div className='grid'>
      { children }
    </div>
  )
}

export default Grid;