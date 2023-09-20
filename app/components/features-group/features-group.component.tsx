// library
import { FC } from "react";

// types
import { Feature } from "@/app/api/api-types";
type FeaturesGroupProps = {
  features?: Feature[];
}

const FeaturesGroup: FC<FeaturesGroupProps> = ({ features }) => {
  return (
    <section className='features-group'>
      FeaturesGroup
    </section>
  )
};

export default FeaturesGroup;