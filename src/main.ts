// Ponto de entrada da aplicação — menu interativo que conecta todas as camadas do projeto.

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { TerminalController } from './controllers/TerminalController';
import { CatalogoPokemon } from './models/CatalogoPokemon';
import { carregarBox, salvarBox } from './services/BoxService';
import { buscarPokemon } from './services/PokeApiService';
import { EntradaValidator } from './validators/EntradaValidator';

async function main(): Promise<void> {
  const interfaceConsole = createInterface({ input: stdin, output: stdout });

  const catalogo = new CatalogoPokemon();
  const terminal = new TerminalController();

  try {
    const pokemonsSalvos = await carregarBox();
    pokemonsSalvos.forEach((pokemon) => catalogo.adicionar(pokemon));

    if (pokemonsSalvos.length > 0) {
      terminal.exibirSucesso(
        `${String(pokemonsSalvos.length)} Pokémon(s) carregado(s) do arquivo pc_box.json`,
      );
    }

    console.log('\n==============================');
    console.log('   Pokédex TypeScript Lite');
    console.log('==============================');

    let rodando = true;
    while (rodando) {
      console.log('\n==============================');
      console.log('[1] Buscar Pokémon na PokeAPI');
      console.log('[2] Remover Pokémon do catálogo');
      console.log('[3] Listar catálogo');
      console.log('[4] Sair');

      const respostaMenu = await interfaceConsole.question(
        '\nDigite o número da opção:\n',
      );

      const opcao = respostaMenu.trim();

      if (opcao === '1') {
        const respostaOperacao = await interfaceConsole.question(
          '\nDigite o nome ou ID do Pokémon que deseja buscar na PokeAPI:  ',
        );

        try {
          const nomeOuId = EntradaValidator.validarEntrada(respostaOperacao);

          const pokemon = await buscarPokemon(nomeOuId);

          terminal.exibirPokemon(pokemon);

          const respostaAdicionar = await interfaceConsole.question(
            `\nDeseja adicionar "${pokemon.nome}" ao catálogo? (Digite: S ou N):  `,
          );

          if (respostaAdicionar.trim().toUpperCase() === 'S') {
            const adicionado = catalogo.adicionar(pokemon);

            if (adicionado) {
              terminal.exibirSucesso(`${pokemon.nome} adicionado ao catálogo.`);
              await salvarBox(catalogo.listar());
              terminal.exibirSucesso('Catálogo atualizado no pc_box.json.');
            }

            if (!adicionado) {
              terminal.exibirAviso(`${pokemon.nome} já está no catálogo.`);
            }
          }

          console.log('\n--- Catálogo atual ---');
          terminal.exibirCatalogo(catalogo.listar());
        } catch (error: unknown) {
          if (error instanceof Error) {
            terminal.exibirErro(error.message);
          }
        }

        continue;
      }

      if (opcao === '2') {
        if (catalogo.listar().length === 0) {
          terminal.exibirAviso('Catálogo vazio. Nenhum Pokémon para remover.');
          continue;
        }

        console.log('\n--- Pokémon no catálogo ---');
        terminal.exibirCatalogoNumerado(catalogo.listar());

        const respostaRemover = await interfaceConsole.question(
          '\nDigite o número do Pokémon que deseja remover:  ',
        );

        const numero = parseInt(respostaRemover.trim(), 10);
        const lista = catalogo.listar();

        if (isNaN(numero) || numero < 1 || numero > lista.length) {
          terminal.exibirErro('Número inválido. Nenhum Pokémon foi removido.');
          continue;
        }

        const pokemonRemover = lista[numero - 1];

        catalogo.remover(pokemonRemover.id);
        terminal.exibirSucesso(`${pokemonRemover.nome} removido do catálogo.`);

        await salvarBox(catalogo.listar());
        terminal.exibirSucesso('Catálogo salvo em pc_box.json.');

        console.log('\n--- Catálogo atual ---');
        terminal.exibirCatalogo(catalogo.listar());
        continue;
      }

      if (opcao === '3') {
        console.log('\n--- Catálogo atual ---');
        terminal.exibirCatalogo(catalogo.listar());
        continue;
      }

      if (opcao === '4') {
        console.log('\nAté logo!');
        rodando = false;
        continue;
      }

      terminal.exibirErro('Opção inválida. Digite um número entre 1 e 4.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      terminal.exibirErro(error.message);
    }
    if (!(error instanceof Error)) {
      terminal.exibirErro('Ocorreu um erro inesperado.');
    }
  } finally {
    interfaceConsole.close();
  }
}

void main();
