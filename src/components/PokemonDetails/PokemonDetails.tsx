import React, { useState } from "react";
import styles from "./PokemonDetails.module.scss";
import { PokemonDetailsProps, PokemonType, Stat } from "../../utils/types";

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ selectedPokemon }) => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    const handleShowExtraInfo = () => {
        setShowExtraInfo((prev) => !prev);
    };
    console.log(selectedPokemon ? "est" : 'net')
    if (!selectedPokemon) {
        return (
            <div className={styles["pokemon-details"]}>
                <p>Pokemon not selected.</p>
            </div>
        );
    }

    const types = selectedPokemon.types
        .map((type: PokemonType) => type.type.name)
        .join(", ");

    const attackStat = selectedPokemon.stats.find(
        (stat: Stat) => stat.stat.name === "attack"
    )?.base_stat;

    const defenseStat = selectedPokemon.stats.find(
        (stat: Stat) => stat.stat.name === "defense"
    )?.base_stat;

    const hpStat = selectedPokemon.stats.find(
        (stat: Stat) => stat.stat.name === "hp"
    )?.base_stat;

    const specialAttackStat = showExtraInfo
        ? selectedPokemon.stats.find(
            (stat: Stat) => stat.stat.name === "special-attack"
        )?.base_stat
        : null;

    const specialDefenseStat = showExtraInfo
        ? selectedPokemon.stats.find(
            (stat: Stat) => stat.stat.name === "special-defense"
        )?.base_stat
        : null;

    const speedStat = showExtraInfo
        ? selectedPokemon.stats.find((stat: Stat) => stat.stat.name === "speed")
            ?.base_stat
        : null;

    const extraInfo = showExtraInfo ? (
        <>
            <p>Special Attack: {specialAttackStat}</p>
            <p>Special Defense: {specialDefenseStat}</p>
            <p>Speed: {speedStat}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Total moves: {selectedPokemon.moves.length}</p>
        </>
    ) : null;

    const shownExtraInfo = showExtraInfo ? "Hide Info" : "Show Info";

    return (
        <div className={styles["pokemon-details"]}>
            <h2>{selectedPokemon.name}</h2>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
            />
            <div className={styles["pokemon-stats"]}>
                <h3>Stats:</h3>
                <p>Type: {types}</p>
                <p>Attack: {attackStat}</p>
                <p>Defense: {defenseStat}</p>
                <p>HP: {hpStat}</p>
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

export default PokemonDetails;
