import React, { useState, useEffect, useContext } from "react";
import styles from "./PokemonList.module.scss";
import axios from "axios";
import { PokemonContext } from "../../App";
import { IPokemon, IPokemonDetails } from "../../utils/types";
import { getTypeStyles } from "../../utils/getStyles";

interface InterfaceProps {
  pokemon: IPokemon;
  index: number;
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const PokemonList: React.FC<InterfaceProps> = ({ pokemon, index, setCardIndex }) => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>();
  const pokemonContext = useContext(PokemonContext);

  useEffect(() => {
      axios
          .get<IPokemonDetails>("https://pokeapi.co/api/v2/pokemon/" + pokemon.name)
          .then((res) => {
              setPokemonDetails(res.data);
              pokemonContext.setPokemons(() => {
                  pokemonContext.pokemons[index].details = res.data;
                  return pokemonContext.pokemons;
              });
          });
  }, []);

  const typeStyles = pokemonDetails?.types.map(type => getTypeStyles(type.type.name)) || [];

  const pokemonCards = (
      <div
          key={pokemon.name}
          className={styles["pokemon-card-container"]}
          onClick={() => setCardIndex(index)}
      >
          <div className={styles["pokemon-card"]}>
              <img
                  src={pokemonDetails?.sprites.front_default}
                  alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
              <div className={styles["pokemon-types"]}>
                  {pokemonDetails?.types.map((type, idx) => (
                      <div
                          key={idx}
                          className={styles["type-tag"]}
                          style={typeStyles[idx]}
                      >
                          {type.type.name}
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  return <div className={styles["pokemons"]}>{pokemonCards}</div>;
};