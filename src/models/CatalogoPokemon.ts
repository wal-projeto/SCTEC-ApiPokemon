// Gerencia a lista de Pokémon em memória — adicionar, listar e remover.

import { PokemonResumo } from './Pokemon';

class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): boolean {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      return false;
    }

    this.pokemons.push(pokemon);
    return true;
  }

  listar(): PokemonResumo[] {
    return this.pokemons;
  }

  remover(id: number): boolean {
    const existe = this.pokemons.find((pokemon) => pokemon.id === id);

    if (!existe) {
      return false;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    return true;
  }
}

export { CatalogoPokemon };
