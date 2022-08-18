// Stwórz funkcję wait(ms). Ma ona zwrócić oczekującą (pending) obietnicę, która
// ma być dotrzymana (resolved) po wybranej ilości milisekund. Obietnica zwrócona
// z tej funkcji nie powinna być nigdy odrzucona (rejected).

export const wait = (ms: number) =>
  new Promise<string>((resolve) => setTimeout(() => resolve('Resolved'), ms));

// Stwórz funkcję delayedError(ms, message), która ma zwracać oczekującą obietnicę
// i odrzucić ją po zadym czasie w milisekundach (ms) przekazując jej w wartości
// obiekt Error z zadaną wiadomością (message). Obietnica zwrócona z tej funkcji
// nie powinna być nigdy dotrzymana (resolved).

export const delayedError = (ms: number, message = 'Error handled') =>
  new Promise<void>((resolve, reject) =>
    setTimeout(() => {
      reject(message);
    }, ms)
  );

// Stwórz funkcję isEven(num), zwracającą obietnicę, która ma natychmiast być
// dotrzymana jeśli przekazana została liczba. Wartością ma być true jeśli liczba
// jest parzysta, false jeśli nieparzysta. Obietnica ma być natychmiast odrzucona
// jeśli is argument funkcji nie jest liczbą całkowitą.

export const isEven = (num: number) =>
  new Promise<boolean>((resolve, reject) => {
    if (isNaN(num) || String(num).includes('.')) {
      reject('Provided number is not an integer!');
    }
    const isEven = (num & 1) === 0;

    resolve(isEven);
  });

// Stwórz funkcję slowIsEven(num, ms=1000), która robi to samo co funkcja isEven ale po
// zadanym czasie w milisekundach. Wykorzystaj do implementacji funkcję isEven oraz wait.

export const slowIsEven = (num: number, ms = 1000) =>
  wait(ms).then(() => isEven(num));

// Stwórz funkcję timeout(promise, ms=3000), zwracającą obietnicę, która ma być dotrzymana
// gdy przekazana obietnica zostanie dotrzymana i otrzymać jej wartość. Chyba, że upłynie
// zadany czas w milisekundach, to obietnica ma być odrzucona. Wykorzystaj do implementacji
// funkcję delayedError.

// Przykład do punktu 5

// timeout(slowIsEven(5, 1000), 3000) // ma dotrzymać obietnicy z wartością false po sekundzie

// timeout(slowIsEven(5, 4000), 2000) // ma odrzucić obietnicę po dwóch sekundach

export const timeout = (promise: Promise<unknown>, ms = 3000) =>
  Promise.race([promise, delayedError(ms, 'The promise took too long!')]);
