// library
import { FC, MouseEventHandler } from "react";

// types
import { SerializedImage } from "@/app/api/api-types";
import Image from "next/image";

type ThumbnailProps = {
  image: SerializedImage;
  selected: boolean;
  className?: string;
  onClick: MouseEventHandler;
};

const Thumbnail: FC<ThumbnailProps> = ({ 
  image, selected, className, onClick 
}) => {
  return (
    <div 
      className={ `thumbnail ${ className }`} 
      onClick={ onClick }
    >
      <Image
        className="thumbnail__image"
        src={ image?.url }
        width={ 100 }
        height={ 100 }
        alt={ image?.filename }
      />
    </div>
  )
}

export default Thumbnail;