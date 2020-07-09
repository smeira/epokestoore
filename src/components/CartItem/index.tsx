import React, { useContext } from "react";

import S from "./CartItem.module.css";

import { IPokemon } from "../../contexts/Pokemon";
import { ICartItem } from "../../contexts/Cart";
import { CartContext } from "../../contexts/CartContext";

import Utils from "../../services/Utils";

const CartItem = ({ cartItem }: { cartItem: ICartItem }) => {
  //   const [cartQuantity, setCartQuantity] = useState(0);

  const { changeCartItems } = useContext(CartContext);

  const addToCart = (product: IPokemon) => {
    changeCartItems(product, "ADD");
  };

  const removeFromCart = (product: IPokemon) => {
    changeCartItems(product, "REMOVE");
  };

  return (
    <li className={S.CartItemContainer}>
      <img src={cartItem.sprites[0]} alt="" />

      <div className={S.CartItemInfoContainer}>
        <span className={S.CartItemTitle}>{cartItem.name}</span> - {" "}
        {cartItem.quantity}x
        <div className={S.CartItemPrice}>{Utils.FormatNumber(cartItem.price)}</div>
      </div>

      <button className={S.CartItemButton} onClick={() => addToCart(cartItem)}>
        +
      </button>

      <button
        className={S.CartItemButton}
        onClick={() => removeFromCart(cartItem)}
      >
        -
      </button>
    </li>
  );
};

export default CartItem;
