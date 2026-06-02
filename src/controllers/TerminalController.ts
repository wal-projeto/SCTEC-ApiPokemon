// Camada responsável por toda comunicação com o usuário no terminal.
// A Classe TerminalController recebe os dados e GERENCIA como exibir de forma clara os resultados das operações
/* 
AÇÕES:
Métodos da Classe:   O que exibe:
exibirSucesso()	     mensagem [OK]. Ex: [OK] pikachu adicionado ao catálogo.
exibirErro()	     mensagem [ERRO]. Ex: [ERRO] Pokémon não encontrado.
exibirAviso()	     mensagem [AVISO].  Ex: [AVISO] Catálogo vazio.
exibirPokemon()	     Recebe um objeto PokemonResumo e formata a exibição. Resultado: #1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69
exibirCatalogo()     Recebe a lista inteira de Pokémon do catálogo e a exibi.
 */

//o TerminalController precisa saber o "molde" de um Pokémon para exibir seus dados
import { PokemonResumo } from '../models/Pokemon';

class TerminalController {
  // Método que recebe qualquer texto e exibe com [OK] na frente
  exibirSucesso(mensagem: string): void {
    console.log(`[OK] ${mensagem}`);
  }

  // Mesmo padrão - exibe com [ERROR] na frete
  exibirErro(mensagem: string): void {
    console.log(`[ERRO] ${mensagem}`);
  }

  // exibe a mensagem com o [AVISO] na frente
  exibirAviso(mensagem: string): void {
    console.log(`[AVISO] ${mensagem}`);
  }

  // Recebe um objeto PokemonResumo e o exibi formatado
  // String(pokemon.id) → converte número para texto (regra do ESLint en string literal)
  // pokemon.tipos.join(', ') → transforma ["grass","poison"] em "grass, poison"
  exibirPokemon(pokemon: PokemonResumo): void {
    console.log(
      `#${String(pokemon.id)} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(', ')} | Altura: ${String(pokemon.altura)} | Peso: ${String(pokemon.peso)}`,
    );
  }

  // Recebe a lista inteira de Pokémon. O forEach() percorre cada Pokémon da lista e chama exibirPokemon
  exibirCatalogo(pokemons: PokemonResumo[]): void {
    // verifica se a lista está vazia
    if (pokemons.length === 0) {
      //chama o próprio método da classe usando this
      this.exibirAviso('Catálogo vazio.'); // chama o próprio método da classe usando this
      return;
    }
    // percorre cada Pokémon e chama exibirPokemon() para cada um
    pokemons.forEach((pokemon) => {
      this.exibirPokemon(pokemon);
    });
  }
}

// exporta a classe para ser usada em outros arquivos
export default TerminalController;
