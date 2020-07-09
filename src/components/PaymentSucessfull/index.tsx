import React from "react";

import S from "./PaymentSucessfull.module.css";

type PaymentSucessfullProps = {
  setPayment(value: React.SetStateAction<boolean>): void;
};

const PaymentSucessfull = ({ setPayment }: PaymentSucessfullProps) => {
  return (
    <div
      onClick={() => setPayment(false)}
      className={S.PaymentSucessfullContainer}
    >
      <div className={S.PaymentSucessfullBlock}>
        <strong className={S.PaymentSucessfullTitle}>
          Compra realizada com sucesso
        </strong>
        <span className={S.PaymentSucessfullText}>
          Clique aqui para continuar comprando!
        </span>
      </div>
    </div>
  );
};

export default PaymentSucessfull;
