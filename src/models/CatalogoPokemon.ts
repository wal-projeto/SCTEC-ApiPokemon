// Criando a Classe para gerenciar a lista de Pokemón, ela guardará os Pokémon numa lista, podendo então adicionar , mostrar e remover cada um.

// importando a interface PokemonResumo para que a Classe CatalogoPokemon saiba o "molde" de um Pokémon.
import { PokemonResumo } from './Pokemon';

class CatalogoPokemon {
  // atributo privado — só a própria classe pode acessar essa lista
  // PokemonResumo[] significa "array de objetos do tipo PokemonResumo"
  // = [] significa que começa vazio
  private pokemons: PokemonResumo[] = [];

  // método que recebe um Pokémon e tenta adicioná-lo à lista: que não retorna nada.
  adicionar(pokemon: PokemonResumo): void {
    // some() percorre a lista e retorna true se ALGUM item tiver o mesmo id, impedi Pokémon duplicado.
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    // se já existir, avisa e para a execução com return
    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está existe no catálogo.`);
      return;
    }

    // Senão exise, adicionamos com o push()  o Pokémon no final da lista
    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} - Pokémon adicionado ao catálogo.`);
  }

  // método listar — mostra todos os Pokémon da lista no terminal
  listar(): void {
    // se a lista estiver vazia, avisa e retorna
    if (this.pokemons.length === 0) {
      console.log('[AVISO] Catálogo vazio.');
      return;
    }

    // forEach() percorre cada Pokémon da lista e exibe as informações de cada
    this.pokemons.forEach((pokemon) => {
      // join(', ') transforma o array de tipos em texto: ["fire","flying"] → "fire, flying"
      console.log(
        //A regra do TypeScript com ESLint exige que números sejam convertidos para texto utilizados dentro de template literals.
        `#${String(pokemon.id)} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(', ')} | Altura: ${String(pokemon.altura)} | Peso: ${String(pokemon.peso)}`,
      );
    });
  }

  // método remover — recebe um id e remove o Pokémon correspondente, devolve um Pokemón ou Undefined se não encontrar
  remover(id: number): void {
    // find() procura o primeiro Pokémon com o id informado
    // retorna o objeto encontrado ou undefined se não existir
    const existe = this.pokemons.find((pokemon) => pokemon.id === id);

    // se não encontrou, avisa e para
    if (!existe) {
      console.log('[AVISO] Nenhum Pokémon encontrado com esse ID.');
      return;
    }

    // filter() cria uma NOVA lista sem o Pokémon que tem aquele id
    // substitui a lista antiga pela nova (sem o removido)
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log('[OK] Pokémon removido do catálogo.');
  }
}

// exporta a classe para ser usada em outros arquivos
export default CatalogoPokemon;
