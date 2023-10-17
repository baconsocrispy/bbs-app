// library
import { FC } from "react";

// types
import { Feature } from "@/app/api/api-types";
type FeaturesProps = {
  features: Feature[];
  header?: string;
};

const Features: FC<FeaturesProps> = ({ features, header }) => {
  return (
    <section className="features-section">
      <h3 className="features-section__header">
        { header ||= 'Features' }
      </h3>

      <ul className="features-section__list">
        { features.map((feature) => 
          <li key={ feature.id } className="features-section__item">
            <p>
              { feature.highlight && 
                <span className="features-section__highlight">
                  { feature.highlight }&nbsp;
                </span>
              }
              <span className="features-section__text">{ feature.text }</span>
            </p>
          </li>
        )}
      </ul>
    </section>
  )
};

export default Features;