import React, { useContext, useEffect, useState, useMemo } from "react";
import { AlertTriangle } from "react-feather";

import { PageContext } from "../../contexts/PageContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import { LoadingContext } from "../../contexts/LoadingContext";

import Product from "../Product";
import Loading from "../Loading";

import S from "./ProductList.module.css";
import Pagination from "../Pagination";
import { IPokemon } from "../../contexts/Pokemon";

const ProductList = () => {
  const { pokemon, getAllPokemon } = useContext(
    PokemonContext
  );
  const { loading, openLoading, closeLoading } = useContext(LoadingContext);
  const { page, typeOfPage } = useContext(PageContext);

  const [alreadyFetched, setAlreadyFetched] = useState(false);

  const emptyPokemonList = useMemo(
    () => pokemon.length === 0 && alreadyFetched,
    [pokemon, alreadyFetched]
  );

  useEffect(() => {
    (async () => {
      if (typeOfPage === "LIST") {
        openLoading();

        await getAllPokemon(page);

        closeLoading();

        setAlreadyFetched(true);
      }
    })();
    // eslint-disable-next-line
  }, [page]);

  return (
    <section className={S.ProductListContainer}>
      {loading && !emptyPokemonList && <Loading />}

      {!loading && emptyPokemonList && (
        <div className={S.EmptyProductListContainer}>
          <AlertTriangle className={S.EmptyProductListIcon} />
          <strong className={S.EmptyProductListTitle}>
            Hm... Parece que essa geração ainda não foi lançada
          </strong>
          <span className={S.EmptyProductListText}>
            Não conseguimos encontrar esses Pokemon
          </span>
        </div>
      )}

      {!emptyPokemonList &&
        !loading &&
        pokemon.map(
          (
            { id, name, sprites, types, price, discount, isShiny }: any,
            _,
            array: IPokemon[]
          ) => {
            return (
              <Product
                isOnly={array.length === 1}
                key={id}
                id={id}
                name={name}
                sprites={sprites}
                types={types}
                discount={discount}
                price={price}
                isShiny={isShiny}
              />
            );
          }
        )}
      <Pagination isLastPage={!loading && emptyPokemonList}/>
    </section>
  );
};

export default ProductList;
