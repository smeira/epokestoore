export interface IPokemon {
  id: number;
  name: string;
  price: number;
  discount: number;
  isShiny: boolean;
  sprites: Array<string>;
  types: Array<string>;
}

export interface IPokemonInfoAPI {
  id: number;
  name: string;
  price: number;
  isShiny: boolean;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  };
  types: Array<{ type: { name: string } }>;
}

export interface IPokemonContext {
  pokemon: IPokemon[];
  getAllPokemon(page?: number): Promise<IPokemon[]>;
  getPokemonByType(type?: string, page?: number): Promise<IPokemon[]>;
  getPokemonOrTypeBySearch(search: string, page?: number): Promise<IPokemon[]>;
}
