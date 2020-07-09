import React from "react";
import "./header.css";
import { FiSearch } from "react-icons/fi";

import logoImg from "../../assets/logo.png";
import grassImg from "../../assets/grass.png";
import { Col } from "react-bootstrap";

export default function Header(props) {
  function handleSearch(e) {
    const term = e.target.value;
    if (term) {
      const filteredItens = props.pokemons.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      props.setCatalogItens(filteredItens);
    } else {
      props.setCatalogItens(props.pokemons);
    }
  }

  return (
    <Col className="col-Header">
      <div className="Header">
       <div className="divSearch">
          <input
            type="text"
            placeholder="Qual pokemon você deseja comprar hoje?"
            onChange={handleSearch}
          />
          <button disabled>
            <FiSearch size={25} />
          </button>
        </div>
      </div>
    </Col>
  );
}
