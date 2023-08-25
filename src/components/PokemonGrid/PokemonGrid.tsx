import React, { useState, useEffect } from "react";
import styles from "./PokemonGrid.module.scss";
import { Pokemon, PokemonGridProps, PokemonType } from "../../utils/types";
import { getTypeStyles } from "../../utils/getStyles";

const PokemonGrid: React.FC<PokemonGridProps> = ({ data, onPokemonClick }) => {
  const [imageLoadError, setImageLoadError] = useState<{
    [key: string]: boolean;
  }>({});
  const [pokemonDataWithTypes, setPokemonDataWithTypes] = useState<Pokemon[]>(
    []
  );

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const pokemonDataArray: Pokemon[] = [];

      for (const pokemon of data.results) {
        try {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          const types = pokemonData.types.map(
            (type: PokemonType) => type.type.name
          );
          const pokemonDataWithType = { ...pokemon, types };
          pokemonDataArray.push(pokemonDataWithType);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
        }
      }

      setPokemonDataWithTypes(pokemonDataArray);
    };

    fetchPokemonTypes();
  }, [data.results]);

  const handleImageError = (pokemonName: string) => {
    setImageLoadError((prevState) => ({ ...prevState, [pokemonName]: true }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderPokemonTypes = (types: any[]) =>
    types.map((type, index) => (
      <React.Fragment key={type}>
        {index > 0 && " "}{" "}
        <span style={getTypeStyles(type)} className={styles["pokemon-type"]}>
          {type}
        </span>
      </React.Fragment>
    ));

  const pokemonCards = pokemonDataWithTypes.map((pokemon) => (
    <div
      key={pokemon.name}
      className={styles["pokemon-card-container"]}
      onClick={() => onPokemonClick(pokemon)}
    >
      <div className={styles["pokemon-card"]}>
        {imageLoadError[pokemon.name] ? (
          <div className={styles["image-not-found"]}>
            <p>Image not found</p>
          </div>
        ) : (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.url.split("/")[6]
            }.png`}
            alt={pokemon.name}
            onError={() => handleImageError(pokemon.name)}
          />
        )}
        <p>{pokemon.name}</p>
        <div className={styles["pokemon-types"]}>
          {renderPokemonTypes(pokemon.types)}
        </div>
      </div>
    </div>
  ));

  return <div className={styles["pokemon-grid"]}>{pokemonCards}</div>;
};

export default PokemonGrid;
