export function fizzBuzz(i: number): string | number {
  let result = '';
  if (i % 3 === 0) {
    result += 'Fizz';
  }
  if (i % 5 === 0) {
    result += 'Buzz';
  }
  return result || i;
}
