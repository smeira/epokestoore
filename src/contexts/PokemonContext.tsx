import React, { useState, ReactElement } from "react";

import PokeApi from "../services/PokeApi";

import { IPokemon, IPokemonInfoAPI, IPokemonContext } from "./Pokemon";
import Utils from "../services/Utils";

interface IPokemonProps {
  children: ReactElement;
}

export const PokemonContext = React.createContext<IPokemonContext>(
  {} as IPokemonContext
);

const PokemonContextProvider: React.FC<IPokemonProps> = ({ children }) => {
  const [pokemon, setPokemon] = useState<any>([]);

  const checkIfShiny = () => {
    const min = 0;
    const max = 100;
    const random = Math.random() * (max - min) + min;

    return random < 1 ? true : false;
  };

  const getPrice = (height: number, weight: number): number => {
    return height * weight;
  };

  // Se for shiny, recebe 50% de desconto
  const getPriceWithShinyDiscount = (price: number): number => {
    return price * 0.5;
  };

  const preparePokemon = (pokemonInfos: IPokemonInfoAPI): IPokemon => {
    const isShiny = checkIfShiny();

    const { id, name, sprites, types, height, weight } = pokemonInfos;

    const backSprite = isShiny ? sprites.back_shiny : sprites.back_default;
    const frontSprite = isShiny ? sprites.front_shiny : sprites.front_default;

    const finalTypes = types.map(({ type }) => type.name);

    const initialPrice = getPrice(height, weight);

    const discount = isShiny ? getPriceWithShinyDiscount(initialPrice) : 0;

    return {
      id,
      name,
      discount,
      price: initialPrice - discount,
      isShiny,
      sprites: [frontSprite, backSprite],
      types: finalTypes,
    };
  };

  const getAllFetchsToPokeApi = async (
    promiseList: Promise<IPokemonInfoAPI>[]
  ) => {
    const pokemonInfos = await Promise.all([...promiseList]);

    const finalList = pokemonInfos.map((pokemonInfo) =>
      preparePokemon(pokemonInfo)
    );

    setPokemon(finalList);

    return finalList;
  };

  const getAllPokemon = async (page: number = 1) => {
    const pokemonList = await PokeApi.getPokemonList(page);

    const pokemon: Promise<IPokemonInfoAPI>[] = pokemonList.map((pokemon) =>
      PokeApi.getPokemonByID(PokeApi.getPokeIDFromURL(pokemon.url))
    );

    return getAllFetchsToPokeApi(pokemon);
  };

  const getPokemonByType = async (type: string = "fire", page: number = 1) => {
    await PokeApi.getTypePokemon(type);

    const types: Promise<IPokemonInfoAPI>[] = PokeApi.getPokemonListByType(
      page
    ).map((pokemonList: any) =>
      PokeApi.getPokemonByID(PokeApi.getPokeIDFromURL(pokemonList.pokemon.url))
    );

    return getAllFetchsToPokeApi(types);
  };

  const getPokemonOrTypeBySearch = async (search: string, page: number = 1) => {
    const response = await PokeApi.doSearch(Utils.NormalizeText(search));

    if (response === undefined || !response) return [];

    if (response.searchBy === "type") {
      const pokemonByTypeList =
        page > 1 ? PokeApi.getPokemonListByType(page) : response.results;

      const types = pokemonByTypeList.map((pokemonList: any) =>
        PokeApi.getPokemonByID(
          PokeApi.getPokeIDFromURL(pokemonList.pokemon.url)
        )
      );

      return getAllFetchsToPokeApi(types);
    } else {
      const preparedPokemon = preparePokemon(response.results)
      setPokemon([preparedPokemon]);
      return response ? [preparedPokemon] : [];
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        getAllPokemon,
        getPokemonByType,
        getPokemonOrTypeBySearch,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;
