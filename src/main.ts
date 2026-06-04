// Ponto de entrada da aplicação — versão interativa com readline.
// O usuário digita o nome ou ID do Pokémon no terminal em vez de valores fixos no código.
// Padrão ensinado pelo professor: createInterface + try/catch/finally.

// stdin: entrada do teclado | stdout: saída no terminal
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

// createInterface: cria a "ponte" entre o terminal e o programa
// node:readline/promises: versão com async/await do módulo readline do Node.js

import { TerminalController } from './controllers/TerminalController';
import { CatalogoPokemon } from './models/CatalogoPokemon';
import { carregarBox, salvarBox } from './services/BoxService';
import { buscarPokemon } from './services/PokeApiService';
import { EntradaValidator } from './validators/EntradaValidator';

async function main(): Promise<void> {
  // cria a interface de leitura do terminal — é ela que captura o que o usuário digita
  const interfaceConsole = createInterface({ input: stdin, output: stdout });

  // cria os objetos das nossas classes
  const catalogo = new CatalogoPokemon();
  const terminal = new TerminalController();

  try {
    // --- CARREGAR: lê o pc_box.json e repopula o catálogo antes de qualquer operação ---
    // na primeira execução o arquivo não existe — carregarBox() retorna [] sem lançar erro
    const pokemonsSalvos = await carregarBox();
    pokemonsSalvos.forEach((pokemon) => catalogo.adicionar(pokemon));

    if (pokemonsSalvos.length > 0) {
      terminal.exibirSucesso(
        `${String(pokemonsSalvos.length)} Pokémon(s) carregado(s) do arquivo.`,
      );
    }

    console.log('\n==============================');
    console.log('   Pokédex TypeScript Lite');
    console.log('==============================');

    // --- LOOP DO MENU: fica repetindo até o usuário escolher sair ---
    // rodando começa como true — vira false quando o usuário escolhe a opção 4
    let rodando = true;
    while (rodando) {
      console.log('\n[1] Buscar Pokémon na PokeAPI');
      console.log('[2] Remover Pokémon do catálogo');
      console.log('[3] Listar catálogo');
      console.log('[4] Sair');

      const respostaMenu = await interfaceConsole.question(
        '\nDigite o número da opção:\n',
      );

      // ==================== OPÇÃO 1 — BUSCAR ====================
      if (respostaMenu.trim() === '1') {
        const respostaOperacao = await interfaceConsole.question(
          '\nDigite o nome ou ID do Pokémon que deseja buscar na PokeAPI:\n',
        );

        // valida a entrada antes de bater na API — EntradaValidator lança erro se inválida
        const nomeOuId = EntradaValidator.validarEntrada(respostaOperacao);

        // buscarPokemon lança erros em vez de retornar null
        const pokemon = await buscarPokemon(nomeOuId);

        terminal.exibirPokemon(pokemon);

        const respostaAdicionar = await interfaceConsole.question(
          `\nDeseja adicionar "${pokemon.nome}" ao catálogo? (Digite: S ou N):\n`,
        );

        if (respostaAdicionar.trim().toUpperCase() === 'S') {
          const adicionado = catalogo.adicionar(pokemon);

          // adicionado = true → Pokémon era novo, foi inserido
          if (adicionado) {
            terminal.exibirSucesso(`${pokemon.nome} adicionado ao catálogo.`);
            await salvarBox(catalogo.listar());
            terminal.exibirSucesso('Catálogo salvo em pc_box.json.');
          }

          // adicionado = false → Pokémon já existia no catálogo
          if (!adicionado) {
            terminal.exibirAviso(`${pokemon.nome} já está no catálogo.`);
          }
        }

        console.log('\n--- Catálogo atual ---');
        terminal.exibirCatalogo(catalogo.listar());
        continue; // volta ao topo do while — exibe o menu novamente
      }

      // ==================== OPÇÃO 2 — REMOVER ====================
      if (respostaMenu.trim() === '2') {
        // catálogo vazio — não há nada para remover, volta ao menu
        if (catalogo.listar().length === 0) {
          terminal.exibirAviso('Catálogo vazio. Nenhum Pokémon para remover.');
          continue; // volta ao menu
        }

        // exibe a lista numerada para o usuário escolher
        console.log('\n--- Pokémon no catálogo ---');
        terminal.exibirCatalogoNumerado(catalogo.listar());

        const respostaRemover = await interfaceConsole.question(
          '\nDigite o número do Pokémon que deseja remover:\n',
        );

        // parseInt converte o texto digitado em número inteiro
        // 10 é a base decimal — boa prática sempre informar
        const numero = parseInt(respostaRemover.trim(), 10);
        const lista = catalogo.listar();

        // número inválido — volta ao menu sem remover nada
        if (isNaN(numero) || numero < 1 || numero > lista.length) {
          terminal.exibirErro('Número inválido. Nenhum Pokémon foi removido.');
          continue; // volta ao menu
        }

        // pega o Pokémon na posição escolhida (index = numero - 1)
        const pokemonRemover = lista[numero - 1];

        // remove pelo id — o método remover() da CatalogoPokemon usa o id
        catalogo.remover(pokemonRemover.id);
        terminal.exibirSucesso(`${pokemonRemover.nome} removido do catálogo.`);

        // salva o catálogo já sem o Pokémon removido
        await salvarBox(catalogo.listar());
        terminal.exibirSucesso('Catálogo salvo em pc_box.json.');

        // exibe o catálogo atualizado para o usuário se certificar
        console.log('\n--- Catálogo atual ---');
        terminal.exibirCatalogo(catalogo.listar());
        continue; // volta ao menu
      }

      // ==================== OPÇÃO 3 — LISTAR ====================
      if (respostaMenu.trim() === '3') {
        console.log('\n--- Catálogo atual ---');
        terminal.exibirCatalogo(catalogo.listar());
        continue; // volta ao menu
      }

      // ==================== OPÇÃO 4 — SAIR ====================
      if (respostaMenu.trim() === '4') {
        // rodando = false faz o while parar na próxima verificação
        console.log('\nAté logo!');
        rodando = false;
        continue;
      }

      // ==================== OPÇÃO INVÁLIDA ====================
      // chegou aqui porque nenhum if acima foi verdadeiro
      terminal.exibirErro('Opção inválida. Digite um número entre 1 e 4.');
    }
  } catch (error: unknown) {
    // instanceof: verifica se o erro é de um tipo específico
    // todos os nossos CustomErrors estendem Error, então sempre entram aqui
    if (error instanceof Error) {
      terminal.exibirErro(error.message);
    }
    if (!(error instanceof Error)) {
      terminal.exibirErro('Ocorreu um erro inesperado.');
    }
  } finally {
    // finally: executado SEMPRE, com erro ou sem erro
    // fecha a interface do terminal para o programa encerrar corretamente
    interfaceConsole.close();
  }
}

// void: avisa ao TypeScript que estamos intencionalmente ignorando o retorno da Promise
void main();
