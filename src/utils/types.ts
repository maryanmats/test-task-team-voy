
export interface PokemonGridProps {
  data: {
    results: Pokemon[];
  };
  onPokemonClick: (pokemon: Pokemon) => void;
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface Move {
  move: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: Stat[];
  url: string;
  weight: number;
  moves: Move[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailsProps {
  selectedPokemon: Pokemon | null;
}
