// library
import { FC, MouseEventHandler } from "react";
import Link from "next/link";

// types
type ButtonProps = {
  text: string;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler;
}

const Button: FC<ButtonProps> = ({ text, href, className, onClick }) => {
  return (
    <button className={ `button ${ className }` } onClick={ onClick }>
      <Link 
        className="button__link"
        href={ href ?? '#' }>
        { text }
      </Link>
    </button>
  )
}

export default Button;