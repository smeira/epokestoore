import React from "react";

import CartContextProvider from "./contexts/CartContext";
import PageContextProvider from "./contexts/PageContext";
import PokemonContextProvider from "./contexts/PokemonContext";
import LoadingContextProvider from "./contexts/LoadingContext";

import Home from "./pages/Home";

import "./styles/global.css";

function App() {
  return (
    <PokemonContextProvider>
      <PageContextProvider>
        <CartContextProvider>
          <LoadingContextProvider>
            <Home />
          </LoadingContextProvider>
        </CartContextProvider>
      </PageContextProvider>
    </PokemonContextProvider>
  );
}

export default App;
