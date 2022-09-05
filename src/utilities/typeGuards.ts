import { CSSProperties } from 'react';
import {
  TimeboxType,
  TimeboxDataType,
  AccessTokenResponseType,
  JwtDecodedDataType,
} from '../common';

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

export const checkIfIsOfTimeboxType = (
  input: unknown
): input is TimeboxType => {
  const instance = input as TimeboxType;

  return (
    instance instanceof Object &&
    !(instance instanceof Array) &&
    typeof instance.id === 'number' &&
    typeof instance.title === 'string' &&
    typeof instance.totalTimeInMinutes === 'number'
  );
};

export const checkIfAreOfTimeboxType = (
  input: unknown
): input is TimeboxType[] => {
  const instance = input as TimeboxType[];

  return (
    instance instanceof Array &&
    instance.every((element) => checkIfIsOfTimeboxType(element))
  );
};

export function asssertIsOfTimeboxType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is TimeboxType {
  const instance = input as TimeboxType;

  if (!checkIfIsOfTimeboxType(instance)) {
    throw new Error(errorMessage);
  }
}

export function asssertAreOfTimeboxType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is TimeboxType[] {
  const instance = input as TimeboxType[];

  if (!checkIfAreOfTimeboxType(instance)) {
    throw new Error(errorMessage);
  }
}

export const checkIfIsOfTimeboxDataType = (
  input: unknown
): input is TimeboxDataType => {
  const instance = input as TimeboxDataType;

  return (
    instance instanceof Object &&
    !(instance instanceof Array) &&
    typeof instance.title === 'string' &&
    typeof instance.totalTimeInMinutes === 'number'
  );
};

export const checkIfAreOfTimeboxDataType = (
  input: unknown
): input is TimeboxDataType[] => {
  const instance = input as TimeboxDataType[];

  return (
    instance instanceof Array &&
    instance.every((element) => checkIfIsOfTimeboxDataType(element))
  );
};

export function asssertIsOfTimeboxDataType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is TimeboxDataType {
  const instance = input as TimeboxDataType;

  if (!checkIfIsOfTimeboxDataType(instance)) {
    throw new Error(errorMessage);
  }
}

export function asssertAreOfTimeboxDataType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is TimeboxDataType[] {
  const instance = input as TimeboxDataType[];

  if (!checkIfAreOfTimeboxDataType(instance)) {
    throw new Error(errorMessage);
  }
}

export const checkIfIsOfAccessTokenResponseType = (
  input: unknown
): input is AccessTokenResponseType => {
  const instance = input as AccessTokenResponseType;

  return (
    instance instanceof Object &&
    !(instance instanceof Array) &&
    typeof instance.accessToken === 'string'
  );
};

export function assertIsOfAccessTokenResponseType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is AccessTokenResponseType {
  if (!checkIfIsOfAccessTokenResponseType(input)) {
    throw new Error(errorMessage);
  }
}

export const checkIfIsOfJwtDecodedDataType = (
  input: unknown
): input is JwtDecodedDataType => {
  const instance = input as JwtDecodedDataType;

  return (
    instance instanceof Object &&
    !(instance instanceof Array) &&
    typeof instance.email === 'string' &&
    typeof instance.exp === 'number' &&
    typeof instance.iat === 'number' &&
    instance.iat < instance.exp &&
    typeof instance.sub === 'string'
  );
};

export function assertIsOfJwtDecodedDataType(
  input: unknown,
  errorMessage = 'Incorrect data type!'
): asserts input is JwtDecodedDataType {
  if (!checkIfIsOfJwtDecodedDataType(input)) {
    throw new Error(errorMessage);
  }
}
