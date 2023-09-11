// library
import { FC } from "react";

// components
import Card from "../card/card.component";

// types
import { Group, Product } from "@/app/api/api-types";
type CardGridProps = {
  items: Group[];
};

const CardGrid: FC<CardGridProps> = ({ items }) => {
  return (
    <section className="card-grid">
      { items.map((item) =>
        <Card key={ item.id } item={ item } path='/categories' />
      )}
    </section>
  )
}

export default CardGrid;