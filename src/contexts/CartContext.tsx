import React, { useState } from "react";

import { IPokemon } from "./Pokemon";

import { ICart, ICartProps, ICartContext } from "./Cart";

export const CartContext = React.createContext<ICartContext>(
  {} as ICartContext
);

const CartContextProvider: React.FC<ICartProps> = ({ children }) => {
  const emptyCart = {
    products: [],
    totalPrice: 0,
    totalDiscount: 0,
  };

  const [cart, setCart] = useState<ICart>(emptyCart);

  const getCart = () => {
    const savedCart = localStorage.getItem("pokestore-cart");

    if (!savedCart) {
      return emptyCart;
    }

    const savedCartParsed: ICart = JSON.parse(savedCart);

    return savedCart ? savedCartParsed : cart;
  };

  const setAndSaveCart = (newCart: ICart) => {
    localStorage.setItem("pokestore-cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const changeCartItems = (
    product: IPokemon,
    action: "ADD" | "REMOVE" | "SET",
    setQuantity: number = 0
  ) => {
    const oldProducts = getCart().products;

    const repeatedProducts = oldProducts.filter(
      (oldProduct) => oldProduct.id === product.id
    );

    const isRepeated = repeatedProducts.length > 0;

    if (isRepeated) {
      const index = oldProducts.findIndex(
        (oldProduct) => oldProduct.id === product.id
      );

      if (action === "SET") {
        oldProducts[index] = {
          ...product,
          quantity: setQuantity,
        };
      }

      if (action === "ADD") {
        const newQuantity = oldProducts[index].quantity + 1;

        oldProducts[index] = {
          ...product,
          quantity: newQuantity,
        };
      }

      if (action === "REMOVE") {
        const currentQuantity = oldProducts[index].quantity;
        const newQuantity = currentQuantity - 1;

        if (newQuantity <= 0) {
          oldProducts.splice(index, 1);
        } else {
          oldProducts[index].quantity = newQuantity;
        }
      }
    }

    const newProducts = isRepeated
      ? oldProducts
      : [...oldProducts, { ...product, quantity: 1 }];

    const [totalPrice, totalDiscount]: Array<number> = newProducts.reduce(
      (total, product) => [
        total[0] + product.price * product.quantity,
        total[1] + product.discount * product.quantity,
      ],
      [0, 0]
    );

    setAndSaveCart({
      products: newProducts,
      totalPrice,
      totalDiscount,
    });
  };

  const doPayment = () => {
    const OrderID = Math.random().toString(36).substring(7);

    const payment = {
      ...cart,
      date: new Date().toLocaleString(),
      status: "OK",
      orderID: OrderID,
    };

    localStorage.setItem(
      `Pedido #${OrderID} - PokeStore`,
      JSON.stringify(payment)
    );

    setAndSaveCart(emptyCart);
  };

  return (
    <CartContext.Provider value={{ getCart, changeCartItems, doPayment }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
