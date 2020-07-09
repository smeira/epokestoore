import React, { useContext, useState, useMemo } from "react";
import { ShoppingBag } from "react-feather";

import CartItem from "../CartItem";
import PaymentSucessfull from "../PaymentSucessfull";

import S from "./Cart.module.css";

import { ICartItem } from "../../contexts/Cart";
import { CartContext } from "../../contexts/CartContext";

import Utils from "../../services/Utils";

const Cart = () => {
  const { getCart, doPayment } = useContext(CartContext);

  const [payment, setPayment] = useState(false);
  const [show, setShow] = useState(false);

  const cart = useMemo(() => getCart(), [getCart]);

  const isCartEmpty = useMemo(() => !cart || cart.products.length === 0, [
    cart,
  ]);

  return (
    <>
      <section className={`${S.CartContainer} ${show ? S.Show : ""}`}>
        <h1 className={S.CartTitle}>Seu Carrinho</h1>

        {!isCartEmpty && (
          <ul className={S.CartListContainer}>
            {cart.products.map((cartItem: ICartItem) => (
              <>
                <CartItem cartItem={cartItem} />
                {/* <CartItem cartItem={cartItem} />*/}
              </>
            ))}
          </ul>
        )}

        {isCartEmpty && (
          <div className={S.EmptyCartContainer}>
            <ShoppingBag className={S.EmptyCartIcon} />
            <strong className={S.EmptyCartTitle}>
              Nenhum produto no carrinho
            </strong>
            <span className={S.EmptyCartText}>Adicione itens ao seu carrinho!</span>
          </div>
        )}

        <div className={S.CartSummary}>
          <span className={S.CartSummaryTitle}>Investimento:</span>
          <span className={S.CartSummaryValue}>
            {Utils.FormatNumber(cart.totalPrice)}
          </span>

          {cart.totalDiscount > 0 && (
            <>
              <span className={S.CartSummaryTitle}>Desconto:</span>
              <span className={S.CartSummaryValue}>
                {Utils.FormatNumber(cart.totalDiscount)}
              </span>
            </>
          )}
        </div>

        <button
          onClick={() => {
            if (cart.products.length > 0) {
              doPayment();
              setPayment(true);
            }
          }}
          className={S.CartButton}
        >
          Finalizar Compra
        </button>

        {payment && <PaymentSucessfull setPayment={setPayment} />}
      </section>

      <div onClick={() => setShow(!show)} className={S.HeaderContainer}>
        <button className={S.HeaderButton}>Carrinho</button>
      </div>
    </>
  );
};

export default Cart;
