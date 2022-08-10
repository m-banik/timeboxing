export function fib(x: number): number {
  return x <= 1 ? x : fib(x - 2) + fib(x - 1);
}
