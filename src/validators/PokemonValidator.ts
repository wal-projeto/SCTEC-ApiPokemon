// Valida o dado bruto recebido da PokeAPI antes de usar no projeto.
// Equivalente ao UsuarioGithubValidator do professor — verifica campo por campo
// se o JSON da API tem o formato esperado antes de transformar em PokemonResumo.
//
// POR QUE VALIDAR? O "as PokemonApiResponse" confiava sem verificar.
// Se a API mudar o formato, o programa quebrava silenciosamente.
// O validator verifica cada campo e lança um erro descritivo se algo estiver errado.
//
// FLUXO:
// resposta.json() → unknown → validate() → PokemonResumo ✓  (ou lança erro)

import { BaseValidator } from './BaseValidator';
import { ErroDeValidacaoError } from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';

export class PokemonValidator extends BaseValidator {
  // --- MÉTODOS AUXILIARES PRIVADOS ---
  // Esses métodos evitam repetir o mesmo padrão de verificação para cada campo.
  // "private" → só o próprio PokemonValidator pode usá-los.

  // verifica se o campo existe no objeto e é um número — retorna o valor ou lança erro
  private static getCampoNumero(obj: object, campo: string): number {
    const registro = obj as Record<string, unknown>;
    const valor = registro[campo];
    if (!this.isNumber(valor)) {
      throw new ErroDeValidacaoError(`Campo "${campo}" ausente ou inválido.`);
    }
    return valor;
  }

  // verifica se o campo existe no objeto e é uma string — retorna o valor ou lança erro
  private static getCampoTexto(obj: object, campo: string): string {
    const registro = obj as Record<string, unknown>;
    const valor = registro[campo];
    if (!this.isString(valor)) {
      throw new ErroDeValidacaoError(`Campo "${campo}" ausente ou inválido.`);
    }
    return valor;
  }

  // verifica se "types" existe, é um array, e cada item tem { type: { name: string } }
  // itera sobre cada item e valida sua estrutura antes de extrair os nomes
  private static getTipos(obj: object): string[] {
    const registro = obj as Record<string, unknown>;

    if (!Array.isArray(registro.types)) {
      throw new ErroDeValidacaoError('Campo "types" ausente ou inválido.');
    }

    // map() percorre cada item do array e retorna o nome do tipo
    // se algum item tiver formato errado, lança erro antes de continuar
    return (registro.types as unknown[]).map((item: unknown) => {
      // cada item deve ser um objeto
      if (!this.isObject(item)) {
        throw new ErroDeValidacaoError('Campo "types" contém item inválido.');
      }

      const itemObj = item as Record<string, unknown>;

      // cada item deve ter um campo "type" que também é um objeto
      if (!this.isObject(itemObj.type)) {
        throw new ErroDeValidacaoError(
          'Campo "types[].type" ausente ou inválido.',
        );
      }

      const typeObj = itemObj.type as Record<string, unknown>;
      const nome = typeObj.name;

      // o campo "name" dentro de "type" deve ser uma string
      if (!this.isString(nome)) {
        throw new ErroDeValidacaoError(
          'Campo "types[].type.name" ausente ou inválido.',
        );
      }

      return nome;
    });
  }

  // --- MÉTODO PRINCIPAL ---
  // recebe o dado bruto da API (unknown) e usa os auxiliares para validar cada parte
  // retorna PokemonResumo já mapeado — ou lança ErroDeValidacaoError se algo estiver errado
  static validate(value: unknown): PokemonResumo {
    if (!this.isObject(value)) {
      throw new ErroDeValidacaoError('Resposta inválida recebida da PokeAPI.');
    }

    // cada chamada verifica e retorna o campo já tipado — ou lança erro automaticamente
    const id = this.getCampoNumero(value, 'id');
    const name = this.getCampoTexto(value, 'name');
    const height = this.getCampoNumero(value, 'height');
    const weight = this.getCampoNumero(value, 'weight');
    const tipos = this.getTipos(value);

    // monta e retorna PokemonResumo com os campos mapeados (inglês → português)
    return {
      id,
      nome: name,
      tipos,
      altura: height,
      peso: weight,
    };
  }
}
