export interface ILoadingProps {
  children: ReactElement;
}

export interface ILoadingContext {
  loading: boolean;
  openLoading(): void;
  closeLoading(): void;
}
