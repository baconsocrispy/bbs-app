'use client'

// library
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components
import Card from "../card/card.component";

// types
import { Group, Product } from "@/app/api/api-types";

type CardGridProps = {
  items: Group[] | Product[];
};

const CardGrid: FC<CardGridProps> = ({ items }) => {
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
      { items?.map((item) =>
        <Card key={ item.id } item={ item } path={ segment }/>
      )}
    </section>
  )
};

export default CardGrid;