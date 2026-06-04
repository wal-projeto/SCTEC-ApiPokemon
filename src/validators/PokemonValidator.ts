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
  // recebe o dado bruto da API (unknown — TypeScript não sabe o tipo ainda)
  // verifica campo por campo se os dados são válidos
  // retorna um PokemonResumo já com os campos mapeados para português
  // lança ErroDeValidacaoError se qualquer campo estiver ausente ou com tipo errado
  static validate(value: unknown): PokemonResumo {
    // PASSO 1: verifica se é um objeto (não null, não array, não string...)
    if (!this.isObject(value)) {
      throw new ErroDeValidacaoError('resposta');
    }

    // PASSO 2: verifica campo "id" — deve existir e ser número
    if (!('id' in value)) {
      throw new ErroDeValidacaoError('id');
    }
    if (!this.isNumber(value.id)) {
      throw new ErroDeValidacaoError('id');
    }

    // PASSO 3: verifica campo "name" — deve existir e ser string
    if (!('name' in value)) {
      throw new ErroDeValidacaoError('name');
    }
    if (!this.isString(value.name)) {
      throw new ErroDeValidacaoError('name');
    }

    // PASSO 4: verifica campo "height" — deve existir e ser número
    if (!('height' in value)) {
      throw new ErroDeValidacaoError('height');
    }
    if (!this.isNumber(value.height)) {
      throw new ErroDeValidacaoError('height');
    }

    // PASSO 5: verifica campo "weight" — deve existir e ser número
    if (!('weight' in value)) {
      throw new ErroDeValidacaoError('weight');
    }
    if (!this.isNumber(value.weight)) {
      throw new ErroDeValidacaoError('weight');
    }

    // PASSO 6: verifica campo "types" — deve existir e ser um array
    if (!('types' in value)) {
      throw new ErroDeValidacaoError('types');
    }
    if (!Array.isArray(value.types)) {
      throw new ErroDeValidacaoError('types');
    }

    // PASSO 7: extrai os nomes dos tipos do array
    // cast seguro aqui — já confirmamos que types é um array
    // cada item tem formato: { type: { name: "electric" } }
    const tipos = (value.types as { type: { name: string } }[]).map(
      (item) => item.type.name,
    );

    // PASSO 8: monta e retorna PokemonResumo com os campos mapeados (inglês → português)
    return {
      id: value.id,
      nome: value.name,
      tipos,
      altura: value.height,
      peso: value.weight,
    };
  }
}
