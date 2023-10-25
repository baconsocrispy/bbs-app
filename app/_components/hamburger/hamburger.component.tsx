// library
import { FC, MouseEventHandler } from 'react';

// types
type HamburgerProps = {
  onClick: MouseEventHandler;
  className?: string;
}

const Hamburger: FC<HamburgerProps> = ({ onClick, className }) => {
  return (
    <div className={ `hamburger ${ className }`} onClick={ onClick }>
      <div className='hamburger__lines'></div>
    </div>
  )
}

export default Hamburger