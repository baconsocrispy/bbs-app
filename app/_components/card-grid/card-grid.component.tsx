'use client'

// library
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components
import Card from "../card/card.component";
import FeaturedCard from "../featured-card/featured-card.component";

// types
import { Category, Group, Product } from "@/app/api/api-types";

type CardGridProps = {
  imageStyle?: string;
  items: Group[] | Product[];
  pinnedItem?: Category;
};

const CardGrid: FC<CardGridProps> = ({ imageStyle, items, pinnedItem }) => {
  // state
  const pathname = usePathname();
  const [ segment, setSegment ] = useState<string | null>(null);
  
  useEffect(() => {
    const currentSegment = pathname.split('/')[1];

    currentSegment === 'categories' ? 
      setSegment('/product-groups/') : 
      setSegment('/products/')
  }, [ pathname ]);

  return (
    <section className="card-grid">
      {
        pinnedItem && <FeaturedCard category={ pinnedItem } />
      }
   
      { items?.map((item) =>
        <Card 
          key={ item.id } 
          imageStyle={ imageStyle }
          item={ item } 
          path={ segment }
        />
      )}
    </section>
  )
};

export default CardGrid;