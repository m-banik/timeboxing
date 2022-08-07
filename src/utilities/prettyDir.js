const obj = { a: 'a', b: 2, c: 'C' };
const arr = ['a', 2, 'C'];
const objArr = [obj, { ...obj }, { ...obj }];
const objObj = { a: obj, b: { ...obj }, c: { ...obj } };
const arrArr = [arr, [...arr], [...arr]];
const arrObj = { a: arr, b: [...arr], c: [...arr] };

function handleInputOfArrayType(input, callback) {
  console.group();

  input.forEach((element, index) => {
    switch (typeof element) {
      case 'number':
        console.log(
          `%c ${index}: %c${element}`,
          `color: pink;`,
          `color: blue;`
        );
        break;
      case 'string':
        console.log(`%c ${index}: %c${element}`, `color: pink;`, `color: red;`);
        break;
      default:
        console.log(`%c ${index}:`, `color: pink;`);
        callback(element);
        break;
    }
  });

  console.groupEnd();
}

function handleInputOfObjectType(input, callback) {
  const [inputKeys, inputValues] = [Object.keys(input), Object.values(input)];

  console.group();

  inputKeys.forEach((inputKey, index) => {
    const inputValue = inputValues[index];

    switch (typeof inputValue) {
      case 'number':
        console.log(
          `%c ${inputKey}: %c${inputValue}`,
          `color: green;`,
          `color: blue;`
        );
        break;
      case 'string':
        console.log(
          `%c ${inputKey}: %c${inputValue}`,
          `color: green;`,
          `color: red;`
        );
        break;
      default:
        console.log(`%c ${inputKey}:`, `color: green;`);
        callback(inputValue);
        break;
    }
  });

  console.groupEnd();
}

export function prettyDir(input) {
  switch (typeof input) {
    case 'number':
      console.log(`%c ${input}`, `color: blue;`);
      break;
    case 'string':
      console.log(`%c ${input}`, `color: red;`);
      break;
    case 'object':
      input instanceof Array
        ? handleInputOfArrayType(input, prettyDir)
        : handleInputOfObjectType(input, prettyDir);
      break;
    default:
      console.warn('Unsupported kind of data!');
      break;
  }
}
