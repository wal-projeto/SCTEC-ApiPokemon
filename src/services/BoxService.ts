/** Camada de Persistência Local — salva e carrega o catálogo em um arquivo JSON.
 *
 * RESPONSABILIDADE:
 * Enquanto o CatalogoPokemon guarda os Pokémon na memória (some desligou, sumiu),
 * o BoxService salva esses dados em disco para que sobrevivam entre execuções.
 *
 * FUNÇÕES:
 * salvarBox()    → recebe a lista e grava no arquivo pc_box.json
 * carregarBox()  → lê o arquivo pc_box.json e devolve a lista
 *
 * FLUXO:
 * PokemonResumo[]  →  JSON.stringify()  →  writeFile()  →  pc_box.json
 * pc_box.json      →  readFile()        →  JSON.parse()  →  PokemonResumo[]
 */

// node:fs/promises — versão assíncrona do módulo de arquivos do Node.js
import { writeFile, readFile } from 'node:fs/promises';
// path.join: monta o caminho do arquivo de forma segura em qualquer sistema operacional
// __dirname: pasta onde este arquivo está (src/services/)
// '../..' sobe duas pastas → chega na raiz do projeto onde o pc_box.json deve ficar
import { join } from 'node:path';

import { PokemonResumo } from '../models/Pokemon';

// caminho absoluto para o arquivo — independe de onde o programa é executado
const ARQUIVO = join(__dirname, '..', '..', 'pc_box.json');

async function salvarBox(pokemons: PokemonResumo[]): Promise<void> {
  // JSON.stringify() transforma o array de objetos em texto JSON
  // null, 2 → formata o JSON com indentação de 2 espaços (mais legível no arquivo)
  const conteudo = JSON.stringify(pokemons, null, 2);

  await writeFile(ARQUIVO, conteudo, 'utf-8');
}

async function carregarBox(): Promise<PokemonResumo[]> {
  try {
    const conteudo = await readFile(ARQUIVO, 'utf-8');
    return JSON.parse(conteudo) as PokemonResumo[];
  } catch (error: unknown) {
    // ENOENT = "No such file or directory" — arquivo ainda não existe (primeira execução)
    // esse é o único caso esperado — retorna lista vazia sem erro
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return [];
    }

    // qualquer outro erro (JSON corrompido, permissão negada...) — relança para o catch do main.ts tratar
    throw error;
  }
}

export { salvarBox, carregarBox };
