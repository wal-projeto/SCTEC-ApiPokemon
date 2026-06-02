// OBJETIVO: Define os "moldes" (interfaces) dos dados usados no projeto.
// A interface garante que todo objeto tenha os campos certos, com os tipos certos.

// Objeto já com os dados simplificados para o projeto.
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[]; // lista de tipos em texto simples (ex: ["electric"] )
  altura: number;
  peso: number;
}

// Representa UM item do array "types" que vem da PokeAPI.
// Interface separada para deixar o PokemonApiResponse mais legível.
interface PokemonType {
  type: {
    name: string; // nome do tipo em inglês (ex: "electric", "fire", "water")
  };
}

// Representa os dados BRUTOS da PokeAPI. Não mapeamos todos os campos, só os que o projeto vai usar.
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[]; // lista de tipos no formato original: [{ type: { name: "grass" } }, { type: { name: "poison" } }]
}
