// Salva e carrega o catálogo de Pokémon em arquivo local (pc_box.json).

import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { PokemonResumo } from '../models/Pokemon';

const ARQUIVO = join(__dirname, '..', '..', 'pc_box.json');

async function salvarBox(pokemons: PokemonResumo[]): Promise<void> {
  const conteudo = JSON.stringify(pokemons, null, 2);
  await writeFile(ARQUIVO, conteudo, 'utf-8');
}

async function carregarBox(): Promise<PokemonResumo[]> {
  try {
    const conteudo = await readFile(ARQUIVO, 'utf-8');
    return JSON.parse(conteudo) as PokemonResumo[];
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return [];
    }

    throw error;
  }
}

export { salvarBox, carregarBox };
