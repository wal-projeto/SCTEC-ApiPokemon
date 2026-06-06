// Classe base com type predicates reutilizados pelos outros validators.

export class BaseValidator {
  protected static isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  protected static isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  protected static isObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
  }
}
