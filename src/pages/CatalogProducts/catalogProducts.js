/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./catalogProducts.css";
import { FiShoppingCart } from "react-icons/fi";
import pokebola from "../../../src/assets/pokebola.png";

import { Col } from "react-bootstrap";

export default function CatalogProducts(props) {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const ArrayPokemons = JSON.parse(localStorage.getItem("pokemons"));

  React.useEffect(() => {
    getPokemons();
  }, [shoppingCart]);

  const getPokemons = async () => {
    props.setCatalogItens(ArrayPokemons);
    props.setPokemons(ArrayPokemons);
    if (!ArrayPokemons) {
      const url = "https://pokeapi.co/api/v2/type/12/";
      const res = await fetch(url);
      const data = await res.json();

      const pokemons = data.pokemon.map((data, index) => ({
        name: data.pokemon.name,
        id: data.pokemon.url.split("/", 7).slice(-1).toString(),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon.url
          .split("/", 7)
          .slice(-1)
          .toString()}.png`,
        quantity: 1,
        price: Math.floor(Math.random() * 100),
      }));

      localStorage.setItem("pokemons", JSON.stringify(pokemons));
      props.setPokemons(pokemons);
      props.setCatalogItens(pokemons);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  async function addProduct(obj) {
    const duplicated = props.cartItens.findIndex(
      (element) => element.name === obj.name
    );

    if (duplicated === -1) {
      setShoppingCart([...shoppingCart, obj]);
      props.setCartItens([...props.cartItens, obj]);
    } else {
      const items = props.cartItens.map((element) => {
        if (obj.name === element.name) {
          const updatePokemon = {
            name: element.name,
            image: element.image,
            quantity: element.quantity + 1,
            price: element.price,
          };
          return updatePokemon;
        }
        return element;
      });

      props.setCartItens(items);
    }
  }

  return (
    <Col className="catalog-container">
      <Col className="catalog">
        {isLoading ? (
          <div>
            {" "}
            <h1>Carregando...</h1>
          </div>
        ) : (
          props.catalogItens.map((pokemon) => (
            <Col
              key={`${pokemon.name}-${pokemon.quantity}-${pokemon.price}`}
              className="products-container-li"
            >
              <figure>
                <img
                  src={pokemon.image}
                  className="imagePokemon"
                  alt={pokemon.name}
                />
              </figure>
              <p className="products-container-ul-li-p">
                {pokemon.name}
                <strong className="products-container-ul-li-strong">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pokemon.price)}
                </strong>
              </p>
              <button
                type="button"
                className="products-container-ul-li-button"
                onClick={() => addProduct(pokemon)}
              >
                <span className="textAddProduct">Capturar</span>
                <img src={pokebola} className="pokebola" alt="pokebola" />
              </button>
            </Col>
          ))
        )}
      </Col>
      <a className="cartScroll" href="#pokebola">
        <FiShoppingCart className="iconCartBottom" size={30} color="white" />
      </a>
    </Col>
  );
}
