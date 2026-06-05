# Pokédex TypeScript Lite
> Mini-Projeto Avaliativo — Módulo 01 — Semana 08 | SCTEC

## Sobre o projeto
Esse projeto foi desenvolvido como parte do curso de Desenvolvimento Back-End Node.js da SCTEC.

A ideia é simples: criar uma aplicação que roda pelo terminal, busca dados de Pokémon numa API pública, valida os dados recebidos e salva o catálogo num arquivo local para não perder tudo quando o programa fechar.

Não tem interface gráfica — tudo acontece no terminal mesmo.

Foi meu primeiro projeto usando TypeScript e foi bem desafiador no começo, mas fui entendendo aos poucos cada conceito.

## O que o projeto faz
- Carrega o catálogo salvo do arquivo `pc_box.json` ao iniciar — `services/BoxService.ts`
- Apresenta um menu interativo com 4 opções que fica em loop até o usuário sair — `main.ts`
- Valida o que o usuário digitou antes de chamar a API — `validators/EntradaValidator.ts`
- Busca Pokémon por nome ou ID na PokeAPI — `services/PokeApiService.ts` função `buscarPokemon()`
- Valida os dados brutos recebidos da API campo por campo — `validators/PokemonValidator.ts`
- Trata erros com classes de erro personalizadas — `models/CustomErrors.ts`
- Transforma a resposta da API num objeto simplificado — `validators/PokemonValidator.ts` método `map()`
- Adiciona Pokémon ao catálogo — `models/CatalogoPokemon.ts` método `adicionar()`
- Impede registro duplicado pelo ID — `models/CatalogoPokemon.ts` método `some()`
- Lista todos os Pokémon do catálogo — `models/CatalogoPokemon.ts` método `listar()`
- Remove Pokémon do catálogo pelo ID — `models/CatalogoPokemon.ts` métodos `find()` e `filter()`
- Salva o catálogo atualizado no arquivo `pc_box.json` — `services/BoxService.ts` com `node:fs/promises`
- Exibe mensagens claras no terminal — `controllers/TerminalController.ts`


## Tecnologias utilizadas
- Node.js
- TypeScript
- TSX
- PokeAPI (API pública e gratuita)
- Git e GitHub
- ESLint + Prettier


## Pré-requisitos
Precisa ter instalado:
- [Node.js](https://nodejs.org/) — versão 24.15.0
- [Git](https://git-scm.com/)

Para verificar se estão instalados, rode no terminal:
node -v
npm -v
git --version


## Como instalar
Clone o repositório:
git clone https://github.com/wal-projeto/SCTEC-ApiPokemon.git

Acesse a pasta:
cd SCTEC-ApiPokemon

Instale as dependências:
npm install

## Como executar
npm run dev

O programa vai exibir no terminal:
==============================
   Pokédex TypeScript Lite
==============================

[1] Buscar Pokémon na PokeAPI
[2] Remover Pokémon do catálogo
[3] Listar catálogo
[4] Sair

Digite o número da opção:

O menu fica em loop — após cada operação volta automaticamente para as opções. Para encerrar escolha `[4] Sair`.


## Estrutura do projeto
SCTEC-ApiPokemon/
│
├── src/
│   ├── main.ts   # ponto de entrada — junta tudo e roda o programa
│   │
│   ├── controllers/
│   │   └── TerminalController.ts   # cuida de tudo que aparece no terminal
│   │
│   ├── models/
│   │   ├── Pokemon.ts          # interfaces que definem o formato dos dados
│   │   ├── CatalogoPokemon.ts  # classe que gerencia a lista de Pokémon
│   │   └── CustomErrors.ts     # classes de erro personalizadas (extra)
│   │
│   ├── services/
│   │   ├── PokeApiService.ts   # busca os dados na PokeAPI
│   │   └── BoxService.ts       # salva e carrega os dados no pc_box.json (extra)
│   │
│   ├── validators/
│   │   ├── BaseValidator.ts    # classe base com helpers de tipo
│   │   ├── EntradaValidator.ts # valida o que o usuário digita no terminal
│   │   └── PokemonValidator.ts # valida os dados brutos recebidos da API
│   │
│   └── utils/
│       └── textFormatters.ts   # funções utilitárias (extra)
│
├── pc_box.json   # gerado automaticamente ao rodar o programa — guarda o catálogo entre execuções
├── tsconfig.json
├── package.json
└── README.md


## Exemplos de execução

### Catálogo carregado do arquivo
[OK] 2 Pokémon(s) carregado(s) do arquivo.

==============================
   Pokédex TypeScript Lite
==============================

[1] Buscar Pokémon na PokeAPI
[2] Remover Pokémon do catálogo
[3] Listar catálogo
[4] Sair

### Opção 1 — Busca válida
Digite o número da opção:
1

Digite o nome ou ID do Pokémon que deseja buscar na PokeAPI:
pikachu

#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60

Deseja adicionar "pikachu" ao catálogo? (Digite: S ou N):
S

[OK] pikachu adicionado ao catálogo.
[OK] Catálogo salvo em pc_box.json.

### Opção 1 — Busca inválida
Digite o nome ou ID do Pokémon que deseja buscar na PokeAPI:
pokemon-inexistente

[ERRO] Pokémon "pokemon-inexistente" não encontrado na PokeAPI.

### Opção 1 — Pokémon já no catálogo
Deseja adicionar "pikachu" ao catálogo? (Digite: S ou N):
S

[AVISO] pikachu já está no catálogo.

### Opção 2 — Remover Pokémon
Digite o número da opção:
2

--- Pokémon no catálogo ---
1 - pikachu
2 - charmander

Digite o número do Pokémon que deseja remover:
1

[OK] pikachu removido do catálogo.
[OK] Catálogo salvo em pc_box.json.

--- Catálogo atual ---
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85

### Opção 3 — Listar catálogo
Digite o número da opção:
3

--- Catálogo atual ---
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85

### Opção 4 — Sair
Digite o número da opção:
4

Até logo!


## O que aprendi com esse projeto
- Como criar um projeto Node.js com TypeScript do zero
- O que são interfaces e como elas ajudam a organizar os dados
- Como usar `fetch` com `async/await` para buscar dados de uma API
- Como tratar erros com `try/catch` e classes de erro personalizadas
- Como usar métodos de array: `map`, `some`, `find`, `filter`, `forEach`
- Como criar classes com atributos privados e métodos
- Como separar responsabilidades em camadas (models, services, controllers, validators)
- Como validar dados recebidos de uma API antes de usar no programa
- Como capturar o que o usuário digita no terminal com `readline`
- Como salvar e carregar dados em arquivo com `node:fs/promises`
- Como usar Git com branches e Pull Requests


## Conceitos aplicados

### TypeScript
O TypeScript foi usado em todo o projeto para garantir que os dados sempre tenham a tipagem certa. Alguns exemplos:

- **Interfaces** definem o formato dos objetos: `PokemonResumo` e `PokemonApiResponse` em `src/models/Pokemon.ts`
- **Parâmetros tipados**: a função `buscarPokemon(nomeOuId: string)` só aceita texto, e `catalogo.adicionar(pokemon: PokemonResumo)` só aceita um objeto no formato certo
- **Retornos tipados**: `buscarPokemon()` retorna `Promise<PokemonResumo>`, deixando claro o que a função devolve com o diamante < >
- **Classes tipadas**: `CatalogoPokemon` tem o atributo `private pokemons: PokemonResumo[]`, garantindo que a lista só guarde objetos do tipo certo
- **Type predicates** nos validators: `isNumber(value: unknown): value is number` — o TypeScript entende que, se a função retornar `true`, o valor é um número


### Interface PokemonResumo
Criada em `src/models/Pokemon.ts`, a interface `PokemonResumo` funciona como um molde que define exatamente quais campos um objeto Pokémon deve ter dentro do projeto e qual o tipo de dado de cada campo.

Quando a PokeAPI responde, ela manda um JSON enorme com dezenas de campos em inglês — coisas como `base_experience`, `game_indices`, `sprites`, `moves` e muito mais. A maioria disso não precisamos.

A interface `PokemonResumo` resolve dois problemas ao mesmo tempo:
- Filtra — guarda só os 5 campos que o projeto realmente usa
- Traduz — os campos ficam em português, mais fácil de entender no código

Além disso, o TypeScript usa essa interface para garantir que toda vez que criarmos um objeto Pokémon no projeto, ele sempre tenha exatamente esses campos — nada faltando, nada sobrando, e cada um com o tipo certo. Se tentarmos criar um Pokémon sem o campo `nome`, o TypeScript avisa o erro antes mesmo de rodar o programa.

Campos da interface:
- `id: number` — número identificador único do Pokémon (ex: 25 para o pikachu)
- `nome: string` — nome em texto (ex: "pikachu")
- `tipos: string[]` — array com os tipos em texto (ex: ["electric"])
- `altura: number` — altura do Pokémon em decímetros
- `peso: number` — peso do Pokémon em hectogramas


### Fetch e async/await
A consulta à PokeAPI acontece na função `buscarPokemon()` em `src/services/PokeApiService.ts`.

O `fetch` é uma função nativa do Node.js que faz uma requisição HTTP para a URL da API. Como a resposta demora (depende da internet), usamos `async/await` para esperar o resultado sem travar o programa.

O fluxo é:
1. `fetch(url)` — envia a requisição para a API
2. `await resposta` — espera a API responder
3. `await resposta.json()` — converte o JSON recebido em objeto JavaScript
4. `PokemonValidator.validate()` — recebe os dados da API, verifica se todos os campos necessários estão ali e transforma no formato da API(inglês) para o formato do projeto(português) - PokemonResumo.


### Tratamento de erros
O projeto usa `try/catch` e classes de erro personalizadas em `src/models/CustomErrors.ts` para tratar cada situação de forma específica:

- **Pokémon não encontrado**: a API retorna status 404 → o `PokeApiService` lança `PokemonNaoEncontradoError` com a mensagem "Pokémon não encontrado na PokeAPI"
- **Sem conexão com a internet**: o `fetch` falha antes de chegar na API → lança `ErroDeConexaoError`
- **Dados inválidos da API**: o `PokemonValidator` verifica cada campo → lança `ErroDeValidacaoError` se algo estiver fora do formato esperado

No `main.ts`, o bloco `catch` captura qualquer um desses erros e exibe a mensagem com `terminal.exibirErro(), que é um Método da Classe TerminalController responsável por exibir de forma clara os resultados das operações. O `finally` garante que o terminal sempre feche corretamente, mesmo quando ocorre um erro.


### Métodos de array
Os métodos de array foram usados em `src/models/CatalogoPokemon.ts` e `src/validators/PokemonValidator.ts`:

- `map` — em `PokemonValidator.ts`: transforma o array de tipos da API `[{ type: { name: "electric" } }]` em um array simples `["electric"]`
- `some` — em `CatalogoPokemon.ts`: verifica se um Pokémon com o mesmo `id` já existe no catálogo antes de adicionar
- `find` — em `CatalogoPokemon.ts`: procura o Pokémon pelo `id` antes de remover, para confirmar que ele existe
- `filter` — em `CatalogoPokemon.ts`: cria uma nova lista sem o Pokémon removido
- `forEach` — em `TerminalController.ts`: percorre a lista do catálogo para exibir cada Pokémon no terminal; também em `main.ts` para recarregar o catálogo do arquivo


### Classe CatalogoPokemon
Criada em `src/models/CatalogoPokemon.ts`, essa classe gerencia a lista de Pokémon na memória enquanto o programa está rodando.

Atributo:
- `private pokemons: PokemonResumo[]` — lista privada de Pokémon. O `private` impede que outros arquivos acessem ou modifiquem a lista diretamente, ou seja, o atributo "pokemons" só pode ser acessado dentro da Classe CatalogoPokemons.

Métodos:
- `adicionar(pokemon: PokemonResumo): boolean` — usa `some()` para checar se o ID já existe. Retorna `true` se adicionou ou `false` se já estava na lista
- `listar(): PokemonResumo[]` — retorna o array completo para quem chamou exibir como quiser
- `remover(id: number): boolean` — usa `find()` para verificar se existe e `filter()` para remover. Retorna `true` se removeu ou `false` se não encontrou


### TerminalController
Criado em `src/controllers/TerminalController.ts` para separar a lógica de dados da exibição no terminal. Assim a classe `CatalogoPokemon` só gerencia dados e o `TerminalController` cuida de tudo que aparece na tela.

Métodos:
- `exibirSucesso(mensagem)` — exibe com `[OK]` na frente
- `exibirErro(mensagem)` — exibe com `[ERRO]` na frente
- `exibirAviso(mensagem)` — exibe com `[AVISO]` na frente
- `exibirPokemon(pokemon)` — formata e exibe os dados de um Pokémon
- `exibirCatalogo(pokemons)` — percorre a lista com `forEach` e exibe cada Pokémon
- `exibirCatalogoNumerado(pokemons)` — exibe a lista numerada por posição (ex: `1 - pikachu`) usada na tela de remoção


### Validators
Seguindo o padrão ensinado em aula, criei uma camada de validação em `src/validators/`:
- `BaseValidator.ts` — classe base com métodos auxiliares, ou seja, é o manual de verificação com 3 perguntas básicas que todos os outros validators usam:  
   `isNumber` → é um número?, 
   `isString` → é um texto?, 
   `isObject` → é um objeto?.
- `EntradaValidator.ts` — herda de `BaseValidator`, valida o texto digitado pelo usuário antes de chamar a API. Usa `ErroDeValidacaoError` para manter consistência com os demais validators
- `PokemonValidator.ts` — herda de `BaseValidator`, valida o JSON da API campo por campo antes de transformar em `PokemonResumo`. Tem três métodos auxiliares privados para evitar repetição de código:
  - `getCampoNumero(obj, campo)` — verifica se o campo existe e é um número
  - `getCampoTexto(obj, campo)` — verifica se o campo existe e é uma string
  - `getTipos(obj)` — verifica se `types` é um array e valida a estrutura de cada item `{ type: { name: string } }` antes de extrair os nomes


### CustomErrors
Criado em `src/models/CustomErrors.ts` com três classes de erro que herdam de `Error`:
- `PokemonNaoEncontradoError` — lançado quando a API retorna 404
- `ErroDeConexaoError` — lançado quando há falha de rede
- `ErroDeValidacaoError` — lançado quando os dados têm formato inválido. Recebe uma mensagem completa e é usado tanto pelo `PokemonValidator` (dados da API) quanto pelo `EntradaValidator` (input do usuário), mantendo o mesmo tipo de erro em toda a camada de validação


### Readline interativo
O `main.ts` usa `createInterface` do `node:readline/promises` para capturar o que o usuário digita no terminal. Segue o padrão `try/catch/finally` onde o `finally` sempre fecha a interface, com ou sem erro.


### BoxService e node:fs/promises
Criado em `src/services/BoxService.ts` com duas funções:

- `salvarBox()` — recebe a lista de Pokémon, transforma em texto JSON com `JSON.stringify` e grava no arquivo `pc_box.json` usando `writeFile`
- `carregarBox()` — lê o arquivo `pc_box.json` com `readFile`, transforma o texto de volta em array com `JSON.parse` e devolve a lista

No `carregarBox()`, o `catch` trata apenas o erro `ENOENT` — que é o código que o sistema operacional usa para dizer "esse arquivo não existe". Isso acontece normalmente na primeira execução, quando o arquivo ainda não foi criado. Nesse caso retorna lista vazia. Se for qualquer outro erro (arquivo corrompido, sem permissão de leitura...), o erro é relançado para o `main.ts` avisar o usuário.

O caminho do arquivo é definido com `path.join(__dirname, '..', '..', 'pc_box.json')`. O `__dirname` é a pasta onde o arquivo `BoxService.ts` está (`src/services/`). O `'..', '..'` sobe duas pastas — saindo de `services/`, depois de `src/` — e chega na raiz do projeto, que é onde o `pc_box.json` deve ficar. Isso garante que o arquivo sempre seja salvo no lugar certo, independente de onde o programa for executado.


## Organização do Kanban
Link do Kanban: https://github.com/users/wal-projeto/projects/3

Colunas que usei: Lista de pendências, Em andamento, Em resumo, Feito


## Branches utilizadas
- `main` — código oficial do projeto
- `develop` — branch de desenvolvimento
- `feat/pokedex` — onde escrevi o código
- `docs/readme` — onde escrevi a documentação

Fluxo de merge: feat/pokedex → develop → main


## Melhorias futuras
- Conectar o catálogo a um banco de dados relacional como o PostgreSQL
- Mostrar mais informações do Pokémon como HP e ataque
- Poder filtrar os Pokémon do catálogo por tipo


## Autora
Desenvolvido como Mini-Projeto Avaliativo do Módulo 01 — Curso de Desenvolvimento Back-End Node.js | SCTEC
