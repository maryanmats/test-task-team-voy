import React, { useState, useEffect, createContext, ChangeEvent } from "react";
import { PokemonList } from "./components/PokemonList";
import { PokemonDetails } from "./components/PokemonDetails";
import "./App.scss";
import { Header } from "./components/Header";
import axios from "axios";
import { IPokemon } from "./utils/types";

export const PokemonContext = createContext<any>({});

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [cardIndex, setCardIndex] = useState(-1);
  const pageSize = 12;

  function fetchPokemons(offset: number) {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`)
      .then((res) => {
        setPokemons((prevPokemons) => {
          return [...prevPokemons, ...res.data.results];
        });
        setFilteredPokemons((prevFilteredPokemons) => {
          return [...prevFilteredPokemons, ...res.data.results];
        });
        console.log(res.data.results);
      });
  }

  useEffect(() => {
    fetchPokemons(offset);
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (pokemon) =>
          pokemon.details.types.filter((type) =>
            type.type.name.includes(searchTerm.toLowerCase())
          ).length > 0
      )
    );
  }, [searchTerm]);

  const handleLoadMore = () => {
    fetchPokemons(offset + pageSize);
    setOffset((prevState) => prevState + pageSize); 
  };

  const isPokemonList = pokemons.length > 0 ? (
    filteredPokemons.map((pokemon, index) => <PokemonContext.Provider
      value={{ pokemons, setPokemons }}
      key={pokemon.name}
  ><PokemonList 
      pokemon={pokemon} 
      key={pokemon.name} 
      index={index} 
      setCardIndex={setCardIndex} 
  /></PokemonContext.Provider>)
  ) : null;
  

  const isLoadMoreButtonVisible =
      searchTerm.length === 0 ? (<button className="load-more-button" onClick={handleLoadMore}>
        Load More
      </button>) : null;

  return (
    <div>
    <Header />
    <div className="container">
      <section className="wrapper">
      <label htmlFor="search" className="search-text">Filter by type: </label>
      <input
        id="search"
        type="text"
        placeholder="Search by pokemon type"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="search"
      />
      <section className="pokemon-list">
        {isPokemonList}
        </section>
        <div className="load-more-button-container">
          {isLoadMoreButtonVisible}
        </div>
        </section>

      <section className="pokemon-details">
        <PokemonDetails pokemon={pokemons[cardIndex]} />
      </section>
    </div>
  </div>
  );
};

export default App;