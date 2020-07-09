import React, { useState } from "react";
import "./shoppingCart.css";
import { FiPlusSquare, FiMinusSquare, FiCheckCircle } from "react-icons/fi";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import pokebola from "../../../src/assets/pokebola.png";

export default function ShoppingCart(props) {
  const [isLoading, setLoading] = useState(true);
  const totalShoppingCart = JSON.parse(
    localStorage.getItem("totalShoppingCart")
  );
  const arrayShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  const items = arrayShoppingCart.map((pokemon) => {
    return pokemon.quantity;
  });

  const totalItens = items.reduce((sum, quantity) => sum + quantity, 0);

  async function addProduct(obj) {
    //Pokemon já existe no carrinho - adiciona mais uma quantidade no pokemon
    const items = props.cartItens.map((pokemon) => {
      if (obj.name === pokemon.name) {
        const updatePokemon = {
          name: pokemon.name,
          image: pokemon.image,
          quantity: pokemon.quantity + 1,
          price: pokemon.price,
        };
        return updatePokemon;
      }
      return pokemon;
    });
    props.setCartItens(items);
  }

  async function removeProduct(obj) {
    const items = props.cartItens.map((pokemon) => {
      if (obj.name === pokemon.name) {
        const updatePokemon = {
          name: pokemon.name,
          image: pokemon.image,
          quantity: pokemon.quantity - 1,
          price: pokemon.price,
        };
        if (updatePokemon.quantity > 0) {
          return updatePokemon;
        }
        return null;
      }
      return pokemon;
    });
    const validateItem = items.filter(Boolean);
    props.setCartItens(validateItem);
  }

  function openModal() {
    if (totalShoppingCart == 0) {
      Swal.fire({
        title: "Oops...",
        text: "Adicione pelo menos um Pokémon para finalizar a compra!",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Voltar",
        showConfirmButton: false,
        cancelButtonColor: "#d33",
      });
      return false;
    } else {
      const cashBack = Math.floor(Math.random() * 9 + 1);
      const stringCash = "0.0" + cashBack;
      Swal.fire({
        title: "Obrigado!",
        text:
          "Você ganhou de volta: " +
          Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(Math.round(Number(stringCash) * totalShoppingCart)) +
          " (" +
          +cashBack +
          "%)",
        icon: "success",
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.close) {
          localStorage.clear();
          window.location.reload();
        }
      });
    }
  }

  return (
    <Col className="container-shoppingCart" sm={4}>
      <Row className="contentTitle">
        <span className="title">Capturados</span>
        <img src={pokebola} className="pokebola" id="pokebola" alt="pokebola" />
        <span className="qtdProductCart">{totalItens ? totalItens : 0}</span>
      </Row>
      {false ? (
        <div>
          <h2>Carrinho vazio</h2>
        </div>
      ) : (
        props.cartItens.map((pokemon) => (
          <Col
            key={`${pokemon.name}-${pokemon.quantity}-${pokemon.price}`}
            className="contentInfo"
          >
            <Col className="divMiniImage">
              <figure>
                <img
                  src={pokemon.image}
                  className="mini-pokemon"
                  alt="imgPokemon"
                />
              </figure>
            </Col>
            <div className="divNameProduct">
              <span className="nameProduct">{pokemon.name}</span>
            </div>
            <div className="divValueProduct">
              <span className="valueProduct">
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(pokemon.price * pokemon.quantity)}
              </span>
            </div>
            <div className="divQtdProduct">
              <span className="qtdProduct">Qtd: {pokemon.quantity} </span>
            </div>
            <div className="divButtonActions">
              <FiPlusSquare
                size={30}
                className="buttonPlus"
                onClick={() => addProduct(pokemon)}
              />
              <FiMinusSquare
                size={30}
                className="buttonMinus"
                onClick={() => removeProduct(pokemon)}
              />
            </div>
          </Col>
        ))
      )}
      <Row className="contentSum">
        <span className="titleSum">Total:</span>
        <span className="textSum">
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(totalShoppingCart)}
        </span>
      </Row>
      <Col className="contentButtonFinish">
        <button type="button" className="buttonSubmit" onClick={openModal}>
          Finalizar Compra
          <FiCheckCircle className="iconCheck" size={24} color="white" />
        </button>
      </Col>
    </Col>
  );
}
