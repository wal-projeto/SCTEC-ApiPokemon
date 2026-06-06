// Valida o texto digitado pelo usuário antes de chamar a API.

import { BaseValidator } from './BaseValidator';
import { ErroDeValidacaoError } from '../models/CustomErrors';

export class EntradaValidator extends BaseValidator {
  private static nomeRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/;

  static validarEntrada(value: unknown): string {
    if (!this.isString(value)) {
      throw new ErroDeValidacaoError('A entrada deve ser um texto.');
    }

    const entrada = value.trim().toLowerCase();

    if (entrada.length === 0) {
      throw new ErroDeValidacaoError(
        'Você não digitou nada. Informe um nome ou ID de Pokémon.',
      );
    }

    ///^\d+$/ significa: do início ao fim, só pode ter dígitos, pelo menos um.
    if (/^\d+$/.test(entrada)) {
      return entrada;
    }

    if (!this.nomeRegex.test(entrada)) {
      throw new ErroDeValidacaoError(
        'Entrada inválida. Use apenas letras, números e hífen. Exemplos: pikachu, mr-mime, 25',
      );
    }

    return entrada;
  }
}
