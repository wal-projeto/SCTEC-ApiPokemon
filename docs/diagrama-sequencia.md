# Diagrama de Sequência — Pokédex TypeScript Lite

## Fluxo completo da aplicação CLICAR Ctrl + Shift + v para visualizar a imagem

```mermaid
sequenceDiagram
    participant M as main.ts
    participant EV as EntradaValidator.ts
    participant P as PokeApiService.ts
    participant PV as PokemonValidator.ts
    participant API as PokeAPI
    participant C as CatalogoPokemon.ts
    participant B as BoxService.ts
    participant T as TerminalController.ts

    Note over M: 1. INICIALIZAÇÃO
    M->>M: createInterface({ input: stdin, output: stdout })
    M->>M: const catalogo = new CatalogoPokemon()
    M->>M: const terminal = new TerminalController()

    Note over M,B: 2. CARREGAR catálogo salvo
    M->>B: carregarBox()
    B->>B: readFile('pc_box.json')
    alt arquivo existe
        B->>B: JSON.parse(conteudo) as PokemonResumo[]
        B-->>M: PokemonResumo[] com pokémons salvos
        M->>C: catalogo.adicionar(pokemon) para cada item
        M->>T: terminal.exibirSucesso("N Pokémon(s) carregado(s) do arquivo.")
    else arquivo não existe — primeira execução
        B-->>M: [] (lista vazia — sem erro)
    end

    Note over M: 3. MENU — loop while até usuário escolher sair
    loop enquanto rodando = true
        M->>M: exibe opções [1] [2] [3] [4]
        M->>M: interfaceConsole.question("Digite o número da opção:")
        M->>M: const opcao = respostaMenu.trim()

        alt opcao === "1" — BUSCAR
            M->>M: interfaceConsole.question("Digite o nome ou ID:")
            M->>EV: EntradaValidator.validarEntrada(entrada)
            EV->>EV: isString() → ok
            EV->>EV: trim().toLowerCase()
            EV->>EV: nomeRegex.test() → válido
            EV-->>M: "pikachu"

            M->>P: buscarPokemon("pikachu")
            P->>API: fetch(url/pikachu)
            API-->>P: HTTP 200 + JSON bruto (unknown)
            P->>PV: PokemonValidator.validate(json)
            PV->>PV: getCampoNumero(id) → ok
            PV->>PV: getCampoTexto(name) → ok
            PV->>PV: getCampoNumero(height) → ok
            PV->>PV: getCampoNumero(weight) → ok
            PV->>PV: getTipos(types) → valida cada item → ok
            PV-->>P: PokemonResumo { id:25, nome:"pikachu", tipos:["electric"], altura:4, peso:60 }
            P-->>M: PokemonResumo

            M->>T: terminal.exibirPokemon(pikachu)
            T-->>M: #25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60

            M->>M: interfaceConsole.question("Deseja adicionar? (S/N):")
            alt usuário digita "S"
                M->>C: catalogo.adicionar(pikachu)
                C->>C: some() → jaExiste = false → push(pikachu)
                C-->>M: return true
                M->>T: terminal.exibirSucesso("pikachu adicionado.")
                M->>B: salvarBox(catalogo.listar())
                B->>B: JSON.stringify() → writeFile('pc_box.json')
                B-->>M: void
                M->>T: terminal.exibirSucesso("Catálogo salvo em pc_box.json.")
            else usuário digita "N"
                M->>M: não adiciona, volta ao menu
            end
            M->>T: terminal.exibirCatalogo(catalogo.listar())

        else opcao === "2" — REMOVER
            alt catálogo vazio
                M->>T: terminal.exibirAviso("Catálogo vazio.")
            else catálogo tem itens
                M->>T: terminal.exibirCatalogoNumerado(catalogo.listar())
                T->>T: forEach() com index → "1 - pikachu", "2 - charmander"
                T-->>M: lista numerada exibida
                M->>M: interfaceConsole.question("Digite o número:")
                M->>M: parseInt(resposta, 10) → numero
                alt número inválido
                    M->>T: terminal.exibirErro("Número inválido.")
                else número válido
                    M->>C: catalogo.remover(pokemonRemover.id)
                    C->>C: find() → existe → filter() → remove
                    C-->>M: return true
                    M->>T: terminal.exibirSucesso("pikachu removido.")
                    M->>B: salvarBox(catalogo.listar())
                    B-->>M: void
                    M->>T: terminal.exibirSucesso("Catálogo salvo.")
                    M->>T: terminal.exibirCatalogo(catalogo.listar())
                end
            end

        else opcao === "3" — LISTAR
            M->>C: catalogo.listar()
            C-->>M: PokemonResumo[]
            M->>T: terminal.exibirCatalogo(lista)
            T->>T: forEach() percorre a lista
            T-->>M: #25 - pikachu | ...

        else opcao === "4" — SAIR
            M->>M: rodando = false
            M->>M: "Até logo!"

        else opção inválida
            M->>T: terminal.exibirErro("Opção inválida.")
        end
    end

    Note over M: 4. ENCERRAMENTO
    M->>M: interfaceConsole.close()

    Note over M,T: FLUXO DE ERRO — Pokémon não encontrado
    P->>API: fetch(url/pokemon-inexistente)
    API-->>P: HTTP 404
    P-->>M: throw PokemonNaoEncontradoError
    M->>T: terminal.exibirErro("Pokémon não encontrado na PokeAPI.")

    Note over M,T: FLUXO DE ERRO — sem internet
    P->>API: fetch(url/pikachu)
    API-->>P: falha de rede
    P-->>M: throw ErroDeConexaoError
    M->>T: terminal.exibirErro("Falha na conexão com a PokeAPI.")
```
