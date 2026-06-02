// INTERFACE: Define os "moldes" dos dados usados no projeto.
// A interface garante que todo objeto tenha os campos certos, com os tipos certos.

// Objeto já com os dados simplificados para o projeto(portugues).
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
}

// Representa UM item do array "types" que vem da PokeAPI.
// Interface separada da PokemonApiResponse, para deixar o código mais legível.
interface PokemonType {
  type: {
    name: string;
  };
}

// Representa os dados BRUTOS da PokeAPI(Ingles). Não foram mapeamos todos os campos, só os que o projeto vai usar.
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
}

/** FLUXO COMPLETO:
 PokemonApiResponse   → molde dos dados BRUTOS que chegam da API
  ↓
  id, name, height,   → campos em inglês — formato original da API
  weight, types[]
  ↓
PokemonType           → molde de CADA ITEM do array types
  ↓
  { type: { name } }  → objeto aninhado com o nome do tipo
  ↓
PokemonResumo         → molde dos dados SIMPLIFICADOS para o projeto
  ↓
  id, nome, tipos[],  → campos em português — formato interno
  altura, peso


 * RELACIONANDO OS CAMPOS:

 * API (PokemonApiResponse)    →   Projeto (PokemonResumo)
─────────────────────────          ──────────────────────
id: number              →          id: number
name: string            →          nome: string
height: number          →          altura: number
weight: number          →          peso: number
types: PokemonType[]    →          tipos: string[]
  └─ type.name: string  →    (via map())

 * É exatamente essa transformação que a função buscarPokemon do PokeApiService.ts vai fazer — pegar o formato da API e converter para o formato do projeto!
 */
