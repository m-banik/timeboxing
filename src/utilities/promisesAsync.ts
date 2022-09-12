import { wait, isEven } from './promises';

// Stwórz asynchroniczną funkcję slowIsEven(num, ms=1000), która robi to samo co funkcja z zadania
// domowego w poprzedniej lekcji. Wykorzystaj do implementacji funkcje isEven oraz wait oraz słowo
// kluczowe await.

export const slowIsEvenByAsync = async (num: number, ms = 1000) => {
  await wait(ms);
  return isEven(num);
};

// Przerób poniższy kod tak aby nadal dwa razy używać słowa kluczowego await. Ale tak żeby operacje
// asynchroniczne rozpoczęły się niemal równocześnie. Nie zmieniaj opóźnień funkcji slowIsEven.
// W konsoli pierwszy komunikat powinien pojawić sie po około 2 sekundach a drugi po około 5.

// const is2Even = await slowIsEven(2, 2000);

// console.log(is2Even ? „2 is even” : „2 is odd”),

// const is5Even = await slowIsEven(5, 5000);

// console.log(is5Even ? „5 is even” : „5 is odd”),

export const cumulateAsync = async () => {
  const is2Even = slowIsEvenByAsync(2, 2000);
  const is5Even = slowIsEvenByAsync(5, 5000);
  console.log((await is2Even) ? '2 is even' : '2 is odd');
  console.log((await is5Even) ? '5 is even' : '5 is odd');
};
