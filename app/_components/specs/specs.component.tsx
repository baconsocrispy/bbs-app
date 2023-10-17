'use client'

// library
import { FC, useEffect, useState } from "react";

// types
import { Spec } from "@/app/api/api-types";
type SpecsProps = {
  specs: Spec[];
};

const Specs: FC<SpecsProps> = ({ specs }) => {
  // state
  const [ sortedSpecs, setSortedSpecs ] = useState({} as { [key:string]: string[] });

  useEffect(() => {
    // sort specs into categories
    const cleanSpecs: { [key: string]: string[] } = specs.reduce((acc, spec) => {
        if (acc.hasOwnProperty(spec.category)) {
          acc[spec.category].push(spec.text);
        } else {
          acc[spec.category] = [ spec.text ];
        }
        return acc;
      }, {} as { [key:string]: string[] }
    );
    setSortedSpecs(cleanSpecs);
  }, [ specs ])

  return (
    <section className="specs-section">
      <h3 className="specs-section__header">
        technical specs
      </h3>
      <ul className="specs-section__category-list">
        {
          Object.entries(sortedSpecs).map((category, index) => 
            <li key={ index } className="specs-section__category">
              <h3 className="specs-section__category-header">{ category[0] }</h3>
              <ul className="specs-section__specs-list">
                { category[1].map((spec, index) => 
                  <li key={ index } className="specs-section__spec">
                    { spec }
                  </li>
                )}
              </ul>
            </li>
          )
        }
      </ul>
    </section>
  )
};

export default Specs;