// Classes de erro personalizadas para identificar cada tipo de falha no programa.

export class PokemonNaoEncontradoError extends Error {
  constructor(nomeOuId: string) {
    super(`Pokémon "${nomeOuId}" não encontrado na PokeAPI.`);
    this.name = 'PokemonNaoEncontradoError';
  }
}

export class ErroDeConexaoError extends Error {
  constructor() {
    super('Falha na conexão com a PokeAPI. Verifique sua internet.');
    this.name = 'ErroDeConexaoError';
  }
}

export class ErroDeValidacaoError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'ErroDeValidacaoError';
  }
}
