// library
import { FC } from "react";

// types
type HeaderProps = {
  text: string;
};

const Header: FC<HeaderProps> = ({ text }) => {
  return (
    <section className="header">
      { text }
    </section>
  )
};

export default Header;