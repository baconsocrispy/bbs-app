// library
import { FC, MouseEventHandler } from "react";

// types
type ButtonProps = {
  text: string;
  className?: string;
  onClick?: MouseEventHandler;
}

const Button: FC<ButtonProps> = ({ text, className, onClick }) => {
  return (
    <button className={ `button ${ className }` } onClick={ onClick }>
      { text }
    </button>
  )
}

export default Button;