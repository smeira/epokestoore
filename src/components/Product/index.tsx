import React, { useState, useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

import S from "./Product.module.css";

import Utils from "../../services/Utils";

import { IPokemon } from "../../contexts/Pokemon";

interface IProductProps extends IPokemon {
  isOnly: boolean;
}

const Product = ({
  id,
  name,
  price,
  sprites,
  isShiny,
  types,
  discount,
  isOnly,
}: IProductProps) => {
  const [sprite, setSprite] = useState(0);

  const { changeCartItems } = useContext(CartContext);

  const getNewSprite = () => {
    return setSprite((sprite + 1) % 2);
  };

  const addToCart = () => {
    changeCartItems(
      {
        id,
        name,
        price,
        discount,
        isShiny,
        sprites,
        types,
      },
      "ADD"
    );
  };

  return (
    <div className={`${S.ProductContainer} ${isOnly ? S.Only : ""}`}>
      <div className={S.ProductSpriteContainer}>
        <img
          className={S.ProductSprite}
          onMouseEnter={getNewSprite}
          onMouseLeave={getNewSprite}
          src={sprites[sprite]}
          alt=""
        />
      </div>

      <div className={S.ProductTitleContainer}>
        <strong className={S.ProductTitle}>{name}</strong>
        <ul className={S.ProductTypeList}>
          {types.map((type, index) => (
            <li
              key={index}
              className={`${S.ProductType} ${types.length > 1 ? "" : S.Single}`}
              style={{ background: `var(--${type})` }}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      <div className={S.ProductInfoContainer}>
        {isShiny && <span className={S.Discount}>50% OFF</span>}

        <span className={`${S.ProductPrice}`}>{Utils.FormatNumber(price)}</span>

        <button onClick={addToCart} className={S.ProductBuyButton}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Product;
