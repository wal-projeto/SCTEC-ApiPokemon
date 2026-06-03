// Ponto de entrada da aplicação. Chama as funções e demonstra o fluxo completo.

import TerminalController from './controllers/TerminalController';
import CatalogoPokemon from './models/CatalogoPokemon';
import { buscarPokemon } from './services/PokeApiService';

async function main(): Promise<void> {
  // cria os objetos a partir das classes
  const catalogo = new CatalogoPokemon();
  const terminal = new TerminalController();

  // busca o pikachu na PokeAPI
  const pikachu = await buscarPokemon('pikachu');
  if (pikachu !== null) {
    const adicionado = catalogo.adicionar(pikachu);
    if (adicionado) {
      terminal.exibirSucesso(`${pikachu.nome} adicionado ao catálogo.`);
    }
  } else {
    terminal.exibirErro('Pokémon não encontrado: pikachu');
  }

  // busca o charmander na PokeAPI
  const charmander = await buscarPokemon('charmander');
  if (charmander !== null) {
    const adicionado = catalogo.adicionar(charmander);
    if (adicionado) {
      terminal.exibirSucesso(`${charmander.nome} adicionado ao catálogo.`);
    }
  } else {
    terminal.exibirErro('Pokémon não encontrado: charmander');
  }

  // tenta adicionar pikachu de novo — deve exibir aviso de duplicidade
  const pikachuDuplicado = await buscarPokemon('pikachu');
  if (pikachuDuplicado !== null) {
    const adicionado = catalogo.adicionar(pikachuDuplicado);
    if (!adicionado) {
      terminal.exibirAviso(`${pikachuDuplicado.nome} já está no catálogo.`);
    }
  }

  // busca um Pokémon inexistente — deve exibir erro
  const inexistente = await buscarPokemon('pokemon-inexistente');
  if (inexistente === null) {
    terminal.exibirErro('Pokémon não encontrado: pokemon-inexistente');
  }

  // lista todos os Pokémon do catálogo
  terminal.exibirCatalogo(catalogo.listar());

  // remove o pikachu pelo ID
  const removido = catalogo.remover(25);
  if (removido) {
    terminal.exibirSucesso('Pokémon removido do catálogo.');
  } else {
    terminal.exibirAviso('Nenhum Pokémon encontrado com esse ID.');
  }

  // lista o catálogo após a remoção
  terminal.exibirCatalogo(catalogo.listar());
}

// O void diz ao TypeScript: "Eu sei que essa função retorna uma Promise e estou intencionalmente ignorando o retorno."
void main();
