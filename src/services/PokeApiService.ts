/** É aqui que acontece a busca na PokeAPI. Essa função vai:
1. Receber um nome ou ID de Pokémon
2. Fazer uma requisição para a API com fetch
3. Usar async/await para esperar a resposta
4. Transformar os dados brutos em PokemonResumo.
5. Tratar erros com try/catch

6. FLUXO COMPLETO:
fetch(url)      → bate na porta da API
  ↓
await resposta  → espera a API responder
  ↓
resposta.json() → abre o pacote de dados (JSON) e transfoma a resposta em json
  ↓
await dados     → recebe (resposta.json()) do tipo unknown como tipo PokemonApiResponse"
  ↓
monta e retorna PokemonResumo  → transforma os "dados" no nosso objeto.
*/

// importa as interfaces necessárias do arquivo Pokemon.ts
import { PokemonApiResponse, PokemonResumo } from '../models/Pokemon';

// URL base da PokeAPI — todo Pokémon é buscado por essa URL + nome ou ID
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// função assíncrona — usa async porque precisa esperar a resposta da API
// retorna uma Promise que poderá ser do tipo PokemonResumo ou null(em caso de erro)
async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  try {
    // fetch busca os dados na API — await espera a resposta chegar
    const resposta = await fetch(`${BASE_URL}/${nomeOuId}`);

    // se o Pokémon não existir a API retorna status 404
    if (!resposta.ok) {
      return null;
    }

    // (resposta.json()) retorna o tipo unknown(qualquer coisa). O " as PokemonApiResponse"  retorna: que é do tipo PokeApiResponse
    const dados = (await resposta.json()) as PokemonApiResponse;

    // map() transforma o array complexo de tipos em array simples de strings : dados.types = [{ type: { name: "grass" } }, { type: { name: "poison" } }]  =>  tipos = ["grass", "poison"]
    const tipos = dados.types.map((item) => item.type.name);

    // monta e retorna o objeto simplificado PokemonResumo: do Ingles(PokemonApiResponse) para o portugues
    return {
      id: dados.id,
      nome: dados.name,
      tipos, // variável construida com o map()
      altura: dados.height,
      peso: dados.weight,
    };
  } catch {
    // captura erros de rede — ex: sem conexão com a internet
    return null;
  }
}

// exporta a função para ser usada em outros arquivos
export { buscarPokemon };
