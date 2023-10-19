// library
import { FC } from "react";
import { usePathname } from "next/navigation";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { Category } from "@/app/api/api-types";

type BlockProps = {
  item: Category;
};

const Block: FC<BlockProps> = ({ item }) => {
  // navigation
  const pathname  = usePathname();

  return (
    <div className="block">
      <div className="block__image-container">
        <Link
          className="block__image-link"
          href={ `${ pathname }/${ item.slug }`}
        >
          <Image 
            className="block__image"
            src={ item.image.url }
            alt={ item.name }
            height={ 460 }
            width={ 690 }
          />
        </Link>
      </div>
      <h4 className="block__header">{ item.name }</h4>
      <p>{ item.tagLine }</p>
      <Link 
        className="block__link"
        href={ `${ pathname }/${ item.slug }`}
      >
        Learn More
      </Link>
    </div>
  )
};

export default Block;