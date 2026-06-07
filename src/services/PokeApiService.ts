// Busca dados de um Pokémon na PokeAPI e retorna um objeto PokemonResumo validado.

import {
  ErroDeConexaoError,
  PokemonNaoEncontradoError,
} from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';
import { PokemonValidator } from '../validators/PokemonValidator';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo> {
  let resposta: Response;

  try {
    resposta = await fetch(`${BASE_URL}/${nomeOuId}`);
  } catch {
    throw new ErroDeConexaoError();
  }

  if (resposta.status === 404) {
    throw new PokemonNaoEncontradoError(nomeOuId);
  }

  if (!resposta.ok) {
    throw new ErroDeConexaoError();
  }

  return PokemonValidator.validate(await resposta.json());
}

export { buscarPokemon };
