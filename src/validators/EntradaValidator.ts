// Valida o texto digitado pelo usuário antes de fazer qualquer operação.
// Equivalente ao validateUsername do professor — verificamos a entrada ANTES de bater na API.
//
// REGRAS DE VALIDAÇÃO:
// - Não pode ser vazio
// - Se for ID: deve ser um número inteiro positivo (ex: "25", "1")
// - Se for nome: só letras, números e hífen (ex: "pikachu", "mr-mime", "ho-oh", "porygon-z")

import { BaseValidator } from './BaseValidator';
import { ErroDeValidacaoError } from '../models/CustomErrors';

export class EntradaValidator extends BaseValidator {
  // regex para nomes de Pokémon: começa com letra ou número, pode ter hífen no meio
  // cobre casos como "mr-mime", "ho-oh", "porygon-z", "tapu-koko"
  private static nomeRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/;

  // recebe o texto bruto digitado pelo usuário
  // retorna a entrada limpa e validada (lowercase e sem espaços)
  // lança um Error se a entrada for inválida — main.ts captura com try/catch
  static validarEntrada(value: unknown): string {
    // antes de mais nada, verificamos se é uma string
    if (!this.isString(value)) {
      throw new ErroDeValidacaoError('A entrada deve ser um texto.');
    }

    // trim() remove espaços no início e no fim — o usuário pode ter digitado com espaço
    // toLowerCase() padroniza para minúsculas (a PokeAPI aceita "pikachu", não "Pikachu")
    const entrada = value.trim().toLowerCase();

    // verifica se ficou vazio após o trim
    if (entrada.length === 0) {
      throw new ErroDeValidacaoError(
        'Você não digitou nada. Informe um nome ou ID de Pokémon.',
      );
    }

    // /^\d+$/ → verifica se é somente dígitos (ID numérico)
    // ^ início, \d+ um ou mais dígitos, $ fim
    if (/^\d+$/.test(entrada)) {
      return entrada; // ID válido — retorna direto
    }

    // se não for número, valida como nome de Pokémon
    if (!this.nomeRegex.test(entrada)) {
      throw new ErroDeValidacaoError(
        'Entrada inválida. Use apenas letras, números e hífen. Exemplos: pikachu, mr-mime, 25',
      );
    }

    return entrada;
  }
}
