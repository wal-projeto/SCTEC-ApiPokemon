// Criando a Classe para gerenciar a lista de Pokemón, ela manipula um array na memória, podendo listar, adicionar, mostrar e remover cada um.
// Aqui não utilizamos try/catch porque a classe CatalogoPokemon não faz nada que possa dar erro inesperado. Arrays nuca "quebram" - eles sempre existem e sempre respondem. Não há risco de erro externo.

// importando a interface PokemonResumo para que a Classe CatalogoPokemon saiba o "molde" de um Pokémon.
import { PokemonResumo } from './Pokemon';

class CatalogoPokemon {
  // atributo privado — só a própria classe pode acessar essa lista
  // PokemonResumo[] significa "array de objetos do tipo PokemonResumo"
  // = [] significa que começa vazio
  private pokemons: PokemonResumo[] = [];

  // método que recebe um Pokémon e tenta adicioná-lo à lista: retorna true se adicionou, false se já existia.
  adicionar(pokemon: PokemonResumo): boolean {
    // some() percorre a lista e retorna true se ALGUM item tiver o mesmo id, impedi Pokémon duplicado.
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    // se já existir, retorna false — quem chamou decide o que exibir
    if (jaExiste) {
      return false;
    }

    // Senão exise, adicionamos com o push()  o Pokémon no final da lista
    this.pokemons.push(pokemon);
    return true;
  }

  // método listar — retorna todos os Pokémon da lista para quem chamou decidir como exibir
  listar(): PokemonResumo[] {
    return this.pokemons;
  }

  // método remover — recebe um id e remove o Pokémon correspondente: retorna true se removeu, false se não encontrou
  remover(id: number): boolean {
    // find() procura o primeiro Pokémon com o id informado
    // retorna o objeto encontrado ou undefined se não existir
    const existe = this.pokemons.find((pokemon) => pokemon.id === id);

    // se não encontrou, retorna false — quem chamou decide o que exibir
    if (!existe) {
      return false;
    }

    // filter() cria uma NOVA lista sem o Pokémon que tem aquele id
    // substitui a lista antiga pela nova (sem o Pokemon removido) e retorna true confirmando a remoção
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    return true;
  }
}

// exporta a classe para ser usada em outros arquivos
export { CatalogoPokemon };
