// Classe base com métodos auxiliares de verificação de tipo.
// Os outros validators herdam desta classe para reutilizar esses helpers.
// Padrão ensinado pelo professor — herança de classes no TypeScript.
//
// POR QUE "value is number" (type predicate)?
// Quando fazemos "typeof value === 'number'", o TypeScript entende que,
// se a função retornar true, o valor É do tipo number — isso se chama type predicate.
// Com isso, após o if, o TypeScript sabe automaticamente o tipo correto.

export class BaseValidator {
  // protected: só esta classe e suas filhas (validators) podem usar esses métodos
  // static: chamado direto na classe, sem precisar criar um objeto (new)

  // verifica se o valor é um número
  protected static isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  // verifica se o valor é uma string (texto)
  protected static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  // verifica se o valor é um objeto não-nulo
  // (arrays também são objetos no JS, por isso verificamos separadamente quando necessário)
  protected static isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
  }
}
