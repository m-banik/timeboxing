import { slowIsEvenByAsync, cumulateAsync, wait } from '.';

describe('slowIsEvenByAsync', () => {
  describe('rejects after 1 second', () => {
    it.each([
      ['number', 'test'],
      ['integer', 3.14],
    ])(
      'if provided value is not a valid %s',
      async (expectedArgumentKind, argument) => {
        await slowIsEvenByAsync(Number(argument), 1000).catch((result) =>
          expect(result).toBe('Provided number is not an integer!')
        );
      }
    );
  });

  describe('resolves after 1 second', () => {
    it.each([
      ['odd', false, 1],
      ['even', true, 2],
    ])(
      'and if provided value is a valid %s number the Promise returns %s',
      async (numberKind, expectedResult, argument) => {
        await slowIsEvenByAsync(argument, 1000).then((result) =>
          expect(result).toBe(expectedResult)
        );
      }
    );
  });
});

describe('cumulateAsync works fine', () => {
  it('as the correct "2 is even" output has been shown after two seconds', async () => {
    jest.spyOn(console, 'log');

    cumulateAsync();
    await wait(2000);

    expect(console.log).toBeCalledWith('2 is even');
  });

  it('as there has been only one message in the console two seconds after the function had been called', async () => {
    await wait(4000);

    jest.clearAllMocks();
    jest.spyOn(console, 'log');

    cumulateAsync();
    await wait(2000);

    expect(console.log).toBeCalledTimes(1);
  }, 10000);

  it('as the correct "5 is odd" output has been shown after five seconds', async () => {
    await wait(3500);

    jest.clearAllMocks();
    jest.spyOn(console, 'log');

    cumulateAsync();
    await wait(5000);

    expect(console.log).toBeCalledWith('5 is odd');
  }, 10000);

  it('as after five seconds there have been only two messages in the console', async () => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log');

    cumulateAsync();
    await wait(5000);

    expect(console.log).toBeCalledTimes(2);
  }, 10000);
});
