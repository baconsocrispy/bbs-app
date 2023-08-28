// library
import { FC } from "react";

// types
type Item = {
  id: number;
  name: string;
}

type CardProps = {
  item: Item;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <div className="card">{ item.name }</div>
  )
}

export default Card;