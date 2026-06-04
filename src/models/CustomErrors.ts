// Classes de erro personalizadas para o projeto.
//
// Por que criar erros próprios em vez de usar o Error genérico?
// Com classes próprias, o catch() consegue identificar QUAL tipo de erro ocorreu
// usando "instanceof" e decidir o que exibir para o usuário.
//
// EXEMPLO:
// catch (error) {
//   if (error instanceof PokemonNaoEncontradoError) → exibe mensagem de "não encontrado"
//   if (error instanceof ErroDeConexaoError)        → exibe mensagem de "sem internet"
// }
//
// COMO FUNCIONA A HERANÇA:
// extends Error     → herda tudo que um erro normal tem (mensagem, pilha de chamadas)
// super(mensagem)   → passa a mensagem para a classe pai (Error)
// this.name         → dá um nome identificável ao erro (aparece no log)

// Lançado quando o Pokémon não é encontrado na PokeAPI (resposta HTTP 404)
export class PokemonNaoEncontradoError extends Error {
  constructor(nomeOuId: string) {
    super(`Pokémon "${nomeOuId}" não encontrado na PokeAPI.`);
    this.name = 'PokemonNaoEncontradoError';
  }
}

// Lançado quando há falha de rede (sem internet, PokeAPI fora do ar)
export class ErroDeConexaoError extends Error {
  constructor() {
    super('Falha na conexão com a PokeAPI. Verifique sua internet.');
    this.name = 'ErroDeConexaoError';
  }
}

// Lançado quando os dados têm formato inválido — usado pelo PokemonValidator e EntradaValidator
// agora recebe a mensagem completa para que cada validator possa descrever o erro com precisão
export class ErroDeValidacaoError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'ErroDeValidacaoError';
  }
}
