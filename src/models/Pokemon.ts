// INTERFACE: define quais campos um objeto deve ter e qual o tipo de cada um
// Com a Interface nenhum Pokémon será criado faltando um campo ou com o tipo errado.

// objeto depois de simplificarmos os dados da API: tipos será uma lista simples de string, mais fácil de usar.
// tipos: strig[] => ["electric"] ou ["grass", "poison"]
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
}

// Represente os campos que vêm da PokeAPI: uma lista de objetos complexos
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

// O [] significa que um Pokemon pode ter mais tipos:
/**
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "types": [
    {
      "type": {
        "name": "grass"
      }
    },
    {
      "type": {
        "name": "poison"
      }
    }
  ]
}

*/
