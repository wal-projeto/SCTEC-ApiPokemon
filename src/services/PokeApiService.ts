/** É aqui que acontece a busca na PokeAPI. Essa função vai:
1. Receber um nome ou ID de Pokémon
2. Fazer uma requisição para a API com fetch
3. Usar async/await para esperar a resposta
4. Passar o dado bruto para o PokemonValidator — que valida e transforma em PokemonResumo
5. Lançar erros personalizados (CustomErrors) em vez de retornar null

FLUXO COMPLETO:
fetch(url)           → bate na porta da API
  ↓
await resposta       → espera a API responder
  ↓
resposta.json()      → abre o pacote de dados (JSON) — retorna unknown
  ↓
PokemonValidator     → valida campo por campo e transforma em PokemonResumo
  ↓
retorna PokemonResumo  (ou lança erro se algo falhar)
*/

import {
  ErroDeConexaoError,
  PokemonNaoEncontradoError,
} from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';
import { PokemonValidator } from '../validators/PokemonValidator';

// URL base da PokeAPI — todo Pokémon é buscado por essa URL + nome ou ID
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// função assíncrona — usa async porque precisa esperar a resposta da API
// agora retorna Promise<PokemonResumo> (sem | null) — erros são lançados, não retornados
async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo> {
  let resposta: Response;

  try {
    // tenta fazer a requisição — se cair aqui é erro de rede (sem internet)
    resposta = await fetch(`${BASE_URL}/${nomeOuId}`);
  } catch {
    // fetch só lança erro em falha de rede — lançamos nosso erro personalizado
    throw new ErroDeConexaoError();
  }

  // a API retorna 404 quando o Pokémon não existe — lançamos erro específico
  if (resposta.status === 404) {
    throw new PokemonNaoEncontradoError(nomeOuId);
  }

  // qualquer outro erro HTTP (500, 403...) → erro de conexão genérico
  if (!resposta.ok) {
    throw new ErroDeConexaoError();
  }

  // resposta.json() retorna unknown — o PokemonValidator valida e transforma
  return PokemonValidator.validate(await resposta.json());
}

// exporta a função para ser usada em outros arquivos
export { buscarPokemon };
