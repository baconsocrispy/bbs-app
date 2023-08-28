// library
import { FC } from "react";

// components
import Card from "../card/card.component";

// types
type Item = {
  id: number;
  name: string;
};

type CardGridProps = {
  items: Item[];
};

const CardGrid: FC<CardGridProps> = ({ items }) => {
  return (
    <section className="card-grid">
      { items.map((item) =>
        <Card key={ item.id } item={ item } path='/products' />
      )}
    </section>
  )
}

export default CardGrid;