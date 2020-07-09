import React, { useState } from "react";
import "./index.css";
import Header from "../src/pages/Header/header";
import CatalogProduct from "../src/pages/CatalogProducts/catalogProducts";
import ShoppingCart from "../src/pages/ShoppingCart/shoppingCart";

import { Container, Row } from "react-bootstrap";

function App() {
  const [cartItens, setCartItens] = useState(
    JSON.parse(localStorage.getItem("shoppingCart"))
      ? [...JSON.parse(localStorage.getItem("shoppingCart"))]
      : []
  );
  const [catalogItens, setCatalogItens] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  function updateCart() {
    const result = cartItens.map((element) => element.price * element.quantity);
    const total = result.reduce((sum, price) => sum + price, 0);
    localStorage.setItem("totalShoppingCart", JSON.stringify(total));
    localStorage.setItem("shoppingCart", JSON.stringify(cartItens));
  }

  updateCart();
  return (
    <Container className="container">
      <Row>
        <Header pokemons={pokemons} setCatalogItens={setCatalogItens} />
      </Row>
      <CatalogProduct
        setCartItens={setCartItens}
        cartItens={cartItens}
        setCatalogItens={setCatalogItens}
        catalogItens={catalogItens}
        setPokemons={setPokemons}
      />
      <ShoppingCart cartItens={cartItens} setCartItens={setCartItens} />
    </Container>
  );
}

export default App;
