import React, { useState, useContext, FormEvent, useEffect } from "react";

import { PageContext } from "../../contexts/PageContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { PokemonContext } from "../../contexts/PokemonContext";

import S from "./Search.module.css";

const Search = () => {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { getPokemonOrTypeBySearch, getAllPokemon } = useContext(PokemonContext);
  const { page, setPageNumber, typeOfPage } = useContext(PageContext);

  const [search, setSearch] = useState("");

  const searchPokemonOrType = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (search.length <= 0) getAllPokemon(1);

    if (typeOfPage !== "SEARCH") setPageNumber(1, "SEARCH");

    openLoading();

    await getPokemonOrTypeBySearch(search, page);

    closeLoading();
  };

  useEffect(() => {
    (async () => {
      if (search.length > 0 && typeOfPage === "SEARCH") {
        openLoading();

        await searchPokemonOrType();

        closeLoading();
      }
    })();
    // eslint-disable-next-line
  }, [page]);

  return (
    <form
      onSubmit={(e) => searchPokemonOrType(e)}
      className={S.SearchContainer}
    >
      <label className={S.SearchLabel} htmlFor="search">
        ePokeStoore
      </label>
      <input
        id="search"
        className={S.SearchInput}
        placeholder="O que você deseja?"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className={S.SearchButton}>
        Pesquisar
      </button>
    </form>
  );
};

export default Search;
