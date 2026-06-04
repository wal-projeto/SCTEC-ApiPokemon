/** Camada de Persistência Local — salva e carrega o catálogo em um arquivo JSON.
 *
 * RESPONSABILIDADE:
 * Enquanto o CatalogoPokemon guarda os Pokémon na memória (some desligou, sumiu),
 * o BoxService salva esses dados em disco para que sobrevivam entre execuções.
 *
 * FUNÇÕES:
 * salvarBox()    → recebe a lista e grava no arquivo box.json
 * carregarBox()  → lê o arquivo box.json e devolve a lista
 *
 * FLUXO:
 * PokemonResumo[]  →  JSON.stringify()  →  writeFile()  →  box.json
 * box.json         →  readFile()        →  JSON.parse()  →  PokemonResumo[]
 */

// node:fs/promises — versão assíncrona do módulo de arquivos do Node.js
// writeFile: grava conteúdo em um arquivo (cria se não existir, sobrescreve se existir)
// readFile:  lê o conteúdo de um arquivo
import { writeFile, readFile } from 'node:fs/promises';

// importa a interface para garantir que o arquivo sempre salve/carregue o formato certo
import { PokemonResumo } from '../models/Pokemon';

// nome do arquivo onde os dados serão guardados — fica na raiz do projeto
const ARQUIVO = 'pc_box.json';

// função assíncrona — usa async porque writeFile precisa de await para esperar o disco
// recebe a lista de Pokémon e não precisa retornar nada (Promise<void>)
async function salvarBox(pokemons: PokemonResumo[]): Promise<void> {
  // JSON.stringify() transforma o array de objetos em texto JSON
  // null, 2 → formata o JSON com indentação de 2 espaços (mais legível no arquivo)
  const conteudo = JSON.stringify(pokemons, null, 2);

  // writeFile() grava o texto no arquivo — await espera a gravação terminar
  // 'utf-8' define a codificação do texto (padrão para arquivos de texto)
  await writeFile(ARQUIVO, conteudo, 'utf-8');
}

// função assíncrona — usa async porque readFile precisa de await para esperar o disco
// retorna uma Promise com o array de Pokémon (ou array vazio se o arquivo não existir)
async function carregarBox(): Promise<PokemonResumo[]> {
  try {
    // readFile() lê o conteúdo do arquivo como texto — await espera a leitura terminar
    const conteudo = await readFile(ARQUIVO, 'utf-8');

    // JSON.parse() transforma o texto JSON de volta em array de objetos
    // "as PokemonResumo[]" diz ao TypeScript: "pode confiar, esse dado tem esse formato"
    return JSON.parse(conteudo) as PokemonResumo[];
  } catch {
    // se o arquivo ainda não existe (primeira execução), readFile lança um erro
    // o catch captura esse erro e devolve uma lista vazia — comportamento esperado
    return [];
  }
}

// exporta as duas funções para serem usadas em outros arquivos
export { salvarBox, carregarBox };
