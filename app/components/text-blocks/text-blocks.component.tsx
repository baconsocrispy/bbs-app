// library
import { FC } from "react";

// types
import { TextBlock } from "@/app/api/api-types";

type TextBlocksProps = {
  textBlocks: TextBlock[];
}

const TextBlocks: FC<TextBlocksProps> = ({ textBlocks }) => {
  return (
    <section className="text-block-section">
      <ul className="text-block-section__list">
      {
        textBlocks.map((textBlock) => 
          <li key={ textBlock.id } className="text-block-section__item">
            <h4>{ textBlock.title }</h4>
            <p>{ textBlock.text }</p>
          </li>
        )
      }
      </ul>
    </section>
  )
};

export default TextBlocks;