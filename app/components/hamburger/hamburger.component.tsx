// library
import { FC, MouseEventHandler } from 'react';

// types
type HamburgerProps = {
  onClick: MouseEventHandler;
}

const Hamburger: FC<HamburgerProps> = ({ onClick }) => {
  return (
    <div className='hamburger' onClick={ onClick }>
      <div className='hamburger__lines'></div>
    </div>
  )
}

export default Hamburger