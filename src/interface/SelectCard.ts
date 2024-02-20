interface SelectCard {
    card: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
    };
    selected: boolean;
    onSelect: (id: string) => void;
  }

  export default SelectCard