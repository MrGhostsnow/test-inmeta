import React from "react";
import {
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
  SelectCheckbox,
} from "./styles";
import SelectCard from "../../interface/SelectCard";
import reduceDescription from "../../utils/reduceDescription";

const CardItem: React.FC<SelectCard> = ({ card, selected, onSelect }) => {
  return (
    <Card key={card.id}>
      <SelectCheckbox
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(card.id)}
      />
      <ImageCard src={card.imageUrl} alt={card.name} />
      <NameCard>{card.name}</NameCard>
      <DescriptionCard>{reduceDescription(card.description)}</DescriptionCard>
    </Card>
  );
};

export default CardItem;
