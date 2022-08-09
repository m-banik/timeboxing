import { CSSProperties } from 'react';

export function assertObjectIsOfCssVariablesPropertiesType(
  input: unknown,
  errorMessage = 'Incorrect CSSProperties object!'
): asserts input is CSSProperties {
  const instance = input as Object;

  if (instance instanceof Object) {
    const instanceKeys = Object.keys(instance);

    const areVariablesOfRightFormat = instanceKeys.every(
      (key) => typeof key === 'string' && key.slice(0, 2) === '--'
    );

    if (!areVariablesOfRightFormat) {
      throw new Error(errorMessage);
    }
  }
}
