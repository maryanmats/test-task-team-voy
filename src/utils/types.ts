export interface IPokemonDetails {
  id: number;
  sprites: {
    front_default: string;
  };
  types: pokemonType[];
  stats: pokemonStatsType[];
  weight: number;
  moves: any[];
}

type pokemonType = {
  type: {
    name: string;
  };
};
type pokemonStatsType = {
  base_stat: number;
  stat: {
    name: string;
  };
}; 

export interface IPokemon {
  name: string;
  url: string;
  details: IPokemonDetails;
}