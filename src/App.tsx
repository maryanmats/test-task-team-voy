import React, { useState } from "react";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import "./App.scss";
import Header from "./components/Header/Header";
import { Pokemon } from "./utils/types";
import { usePokemons } from "./utils/helpers";
import Loader from "./components/Loader/Loader";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { isLoading, error, data } = usePokemons(currentPage, pageSize);

  const handlePokemonClick = async (pokemon: Pokemon) => {
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();
    setSelectedPokemon(pokemonData);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const isLoadingData = isLoading ? (
    <div className="empty-grid">
      <Loader />
    </div>
  ) : null;

  const isError = error ? (
    <div>
      <ErrorPage errorMessage="Something wrong" />
    </div>
  ) : null;

  const isPokemonGrid = data ? (
    <PokemonGrid data={data} onPokemonClick={handlePokemonClick} />
  ) : null;


  const isPrevButtonVisible =
    !isLoading && data?.results && currentPage > 1 ? (
      <button className="load-more-button" onClick={handlePrevPage}>
        Prev
      </button>
    ) : null;

  const isLoadMoreButtonVisible =
    !isLoading && data?.results && data.results.length === pageSize ? (
      <button className="load-more-button" onClick={handleLoadMore}>
        Load More
      </button>
    ) : null;

  return (
    <div>
      <Header />
      <div className="container">
        {isLoadingData}
        {isError}
        {isPokemonGrid}
          <PokemonDetails selectedPokemon={selectedPokemon} />
        <div className="load-more-button-container">
          {isPrevButtonVisible}
          {isLoadMoreButtonVisible}
        </div>
      </div>
    </div>
  );
};

export default App;
