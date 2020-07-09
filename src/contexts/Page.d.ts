export interface IPageProps {
  children: ReactElement;
}

export type TypeOfPage = "LIST" | "SEARCH";

export interface IPageContext {
  page: number;
  typeOfPage: TypeOfPage;
  nextPage(newContext?: TypeOfPage): boolean;
  previousPage(newContext?: TypeOfPage): boolean;
  setPage(page: React.SetStateAction<number>): void;
  setPageNumber(page: number, newContext?: TypeOfPage): boolean;
}
