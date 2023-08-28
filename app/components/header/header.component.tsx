// library
import { FC } from "react";

// types
type HeaderProps = {
  image_url: string;
  text: string;
};

const Header: FC<HeaderProps> = ({ image_url, text }) => {
  return (
    <section 
      className="header"
      style={{ backgroundImage: `url(${ image_url})` }}
    >
      { text }
    </section>
  )
};

export default Header;