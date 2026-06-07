// Valida os dados brutos recebidos da PokeAPI verificando se os campos
// existem e se seus valores são do tipo correto: número, string e array de strings.

import { BaseValidator } from './BaseValidator';
import { ErroDeValidacaoError } from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';

export class PokemonValidator extends BaseValidator {
  //se campo não existe valor => undefined / se campo existe e valor não é um numero => falso
  private static getCampoNumero(obj: object, campo: string): number {
    const registro = obj as Record<string, unknown>;
    const valor = registro[campo];
    if (!this.isNumber(valor)) {
      throw new ErroDeValidacaoError(
        `Campo "${campo}" ausente ou seu valor inválido, não é um número.`,
      );
    }
    return valor;
  }

  private static getCampoTexto(obj: object, campo: string): string {
    const registro = obj as Record<string, unknown>;
    const valor = registro[campo];
    if (!this.isString(valor)) {
      throw new ErroDeValidacaoError(
        `Campo "${campo}" ausente ou seu valor inválido, não é uma string.`,
      );
    }
    return valor;
  }

  // types é um array?
  private static getTipos(obj: object): string[] {
    const registro = obj as Record<string, unknown>;

    if (!Array.isArray(registro.types)) {
      throw new ErroDeValidacaoError(
        'Campo "types" ausente ou inválido=> não é um array!.',
      );
    }

    //cada item do array é um objeto?
    return (registro.types as unknown[]).map((item: unknown) => {
      if (!this.isObject(item)) {
        throw new ErroDeValidacaoError(
          'Campo "types" contém item inválido, que não é um Objeto!.',
        );
      }

      // as Record<string,unknow> significa que TS trata o objeto como um dicionário onde qualquer chave de texto pode ser acessada
      const itemObj = item as Record<string, unknown>;

      //dentro do objeto, type existe e é um objeto?
      if (!this.isObject(itemObj.type)) {
        throw new ErroDeValidacaoError(
          'Campo "types[].type" ausente(undefined) ou inválido(não é um objeto).',
        );
      }

      // se dentro do objeto type existe o campo name e se ele é uma string
      const typeObj = itemObj.type as Record<string, unknown>;
      const nome = typeObj.name;

      if (!this.isString(nome)) {
        throw new ErroDeValidacaoError(
          'Campo "types[].type.name" ausente(undefined) ou inválido(não é string).',
        );
      }

      return nome;
    });
  }

  static validate(value: unknown): PokemonResumo {
    if (!this.isObject(value)) {
      throw new ErroDeValidacaoError('Resposta inválida recebida da PokeAPI.');
    }

    const id = this.getCampoNumero(value, 'id');
    const name = this.getCampoTexto(value, 'name');
    const height = this.getCampoNumero(value, 'height');
    const weight = this.getCampoNumero(value, 'weight');
    const tipos = this.getTipos(value);

    return {
      id,
      nome: name,
      tipos,
      altura: height,
      peso: weight,
    };
  }
}
