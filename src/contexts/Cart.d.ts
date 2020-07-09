import { IPokemon } from "./Pokemon";

export interface ICartItem extends IPokemon {
  quantity: number;
}

export interface ICart {
  products: Array<ICartItem>;
  totalPrice: number;
  totalDiscount: number;
}

export interface ICartProps {
  children: ReactElement;
}

export interface ICartContext {
  getCart(): ICart;
  changeCartItems(
    products: IPokemon,
    action: "ADD" | "REMOVE" | "SET",
    setQuantity?: number
  ): void;
  doPayment(): void;
}
