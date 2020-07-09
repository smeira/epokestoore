import React, { useContext, useMemo } from "react";

import { PageContext } from "../../contexts/PageContext";

import S from "./Pagination.module.css";

interface IPaginationProps {
  isLastPage: boolean;
}

const Pagination = ({ isLastPage }: IPaginationProps) => {
  const { previousPage, nextPage, page, setPage } = useContext(PageContext);

  const isFirstPage = useMemo(() => Number(page) === 1, [page]);

  return (
    <div className={S.PaginationContainer}>
      <button
        className={S.PaginationButton}
        onClick={() => (!isFirstPage ? previousPage() : false)}
        disabled={isFirstPage}
      >
        Página Anterior
      </button>
      <input
        className={S.PaginationInput}
        type="text"
        onChange={(e) => setPage(Number(e.target.value))}
        value={page}
      />
      <button
        className={S.PaginationButton}
        onClick={() => {
          nextPage();
        }}
        disabled={isLastPage}
      >
        Próxima Página
      </button>
    </div>
  );
};

export default Pagination;
