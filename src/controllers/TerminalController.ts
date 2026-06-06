// Responsável por toda comunicação com o usuário no terminal.

import { PokemonResumo } from '../models/Pokemon';

class TerminalController {
  exibirSucesso(mensagem: string): void {
    console.log(`[OK] ${mensagem}`);
  }

  exibirErro(mensagem: string): void {
    console.log(`[ERRO] ${mensagem}`);
  }

  exibirAviso(mensagem: string): void {
    console.log(`[AVISO] ${mensagem}`);
  }

  exibirPokemon(pokemon: PokemonResumo): void {
    console.log(
      `#${String(pokemon.id)} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(', ')} | Altura: ${String(pokemon.altura)} | Peso: ${String(pokemon.peso)}`,
    );
  }

  exibirCatalogo(pokemons: PokemonResumo[]): void {
    if (pokemons.length === 0) {
      this.exibirAviso('Catálogo vazio.');
      return;
    }
    pokemons.forEach((pokemon) => {
      this.exibirPokemon(pokemon);
    });
  }

  exibirCatalogoNumerado(pokemons: PokemonResumo[]): void {
    if (pokemons.length === 0) {
      this.exibirAviso('Catálogo vazio.');
      return;
    }
    pokemons.forEach((pokemon, index) => {
      console.log(`${String(index + 1)} - ${pokemon.nome}`);
    });
  }
}

export { TerminalController };
