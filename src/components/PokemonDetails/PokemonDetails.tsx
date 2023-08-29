import React, { useState } from "react";
import styles from "./PokemonDetails.module.scss";
import { IPokemon } from "../../utils/types";

interface InterfaceProps {
  pokemon: IPokemon;
}

export const PokemonDetails: React.FC<InterfaceProps> = ({ pokemon }) => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    if (!pokemon) {
      return (
          <div className={styles["pokemon-details"]}>
              <p>Pokemon not selected.</p>
          </div>
      );
  }
  
    const handleShowExtraInfo = () => {
        setShowExtraInfo((prev) => !prev);
    };

    const types = pokemon.details?.types
        .map((type) => type.type.name)
        .join(", ");

    const attackStat = pokemon.details?.stats.find(
        (stat) => stat.stat.name === "attack"
    )?.base_stat;

    const defenseStat = pokemon.details?.stats.find(
        (stat) => stat.stat.name === "defense"
    )?.base_stat;

    const hpStat = pokemon.details?.stats.find(
        (stat) => stat.stat.name === "hp"
    )?.base_stat;

    const specialAttackStat = showExtraInfo
        ? pokemon.details?.stats.find(
            (stat) => stat.stat.name === "special-attack"
        )?.base_stat
        : null;

    const specialDefenseStat = showExtraInfo
        ? pokemon.details?.stats.find(
            (stat) => stat.stat.name === "special-defense"
        )?.base_stat
        : null;

    const speedStat = showExtraInfo
        ? pokemon.details?.stats.find((stat) => stat.stat.name === "speed")
            ?.base_stat
        : null;

    const extraInfo = showExtraInfo ? (
        <>
            <p><strong>Special Attack:</strong> {specialAttackStat}</p>
            <p><strong>Special Defense:</strong> {specialDefenseStat}</p>
            <p><strong>Speed:</strong> {speedStat}</p>
            <p><strong>Weight:</strong> {pokemon.details?.weight}</p>
            <p><strong>Total moves:</strong> {pokemon.details?.moves.length}</p>
        </>
    ) : null;

    const shownExtraInfo = showExtraInfo ? "Hide Info" : "Show Info";

    return (
        <div className={styles["pokemon-details"]}>
            <h2>{pokemon.name}</h2>
            <img
                src={pokemon.details?.sprites.front_default}
                alt={pokemon.name}
            />
            <div className={styles["pokemon-stats"]}>
                <h3>Stats:</h3>
                <p><strong>Type:</strong> {types}</p>
                <p><strong>Attack:</strong> {attackStat}</p>
                <p><strong>Defense:</strong> {defenseStat}</p>
                <p><strong>HP:</strong> {hpStat}</p>
                {extraInfo}
            </div>
            <button
                className={`${styles["show-info-button"]} load-more-button`}
                onClick={handleShowExtraInfo}
            >
                {shownExtraInfo}
            </button>
        </div>
    );
};