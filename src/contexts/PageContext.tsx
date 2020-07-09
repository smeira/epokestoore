import React, { useState } from "react";

import { IPageContext, IPageProps, TypeOfPage } from "./Page";

export const PageContext = React.createContext<IPageContext>(
  {} as IPageContext
);

const PageContextProvider: React.FC<IPageProps> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [typeOfPage, setTypeOfPage] = useState<TypeOfPage>("LIST");

  const nextPage = (newTypeOfPage: TypeOfPage) => {
    setPage(page + 1);

    setTypeOfPage(newTypeOfPage ? newTypeOfPage : typeOfPage);
    
    return true;
  };

  const previousPage = (newTypeOfPage: TypeOfPage = typeOfPage) => {
    const newPage = page === 1 ? page : page - 1;

    setPage(newPage);

    setTypeOfPage(newTypeOfPage ? newTypeOfPage : typeOfPage);

    return true;
  };

  const setPageNumber = (pageNumber: number, newTypeOfPage: TypeOfPage = typeOfPage) => {
    const newPage = pageNumber < 1 ? 1 : pageNumber;

    setPage(newPage);

    setTypeOfPage(newTypeOfPage ? newTypeOfPage : typeOfPage);

    return true;
  };

  return (
    <PageContext.Provider
      value={{ nextPage, previousPage, setPage, page, setPageNumber, typeOfPage }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
