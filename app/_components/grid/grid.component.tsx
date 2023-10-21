// library
import { FC, ReactNode } from 'react';

// components
import Footer from '../footer/footer.component';
import Nav from '../nav/nav.component';

// types
type GridProps = {
  children: ReactNode;
  navOptions?: {
    background?: string;
    overlay?: boolean;
    theme?: string;
  };
};

// component
const Grid: FC<GridProps> = ({ children, navOptions }) => {
  return (
    <div className={ `grid ${ navOptions?.overlay && 'grid--no-navbar'}`}>
      <Nav 
        background={ navOptions?.background }
        overlay={ navOptions?.overlay }
        theme={ navOptions?.theme }
      />
      { children }
      <Footer />
    </div>
  )
};

export default Grid;