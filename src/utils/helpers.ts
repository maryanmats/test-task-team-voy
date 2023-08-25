import { useQuery } from "react-query";

export const fetchPokemons = async (currentPage: number, pageSize: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${
      (currentPage - 1) * pageSize
    }`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePokemons = (currentPage: number, pageSize: number) => {
  return useQuery(["pokemons", currentPage], () =>
    fetchPokemons(currentPage, pageSize)
  );
};
