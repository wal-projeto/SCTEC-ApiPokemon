// Define os moldes dos dados usados no projeto.

export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
}

interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
}
