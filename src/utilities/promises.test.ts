import { wait, delayedError, isEven, slowIsEven, timeout } from '.';

describe('wait', () => {
  it('returns a new handled Promise after 2000 milliseconds', async () =>
    await wait(2000).then((resolvedValue) =>
      expect(resolvedValue).toBe('Resolved')
    ));
});

describe('delayedError', () => {
  it('rejects and handles the error message after 1000 milliseconds', async () => {
    console.log = jest.fn();
    await delayedError(1000, 'test').then(() =>
      expect(console.log).toBeCalledWith('test')
    );
  });
});

describe('isEven', () => {
  describe('rejects', () => {
    it.each([
      ['number', 'test'],
      ['integer', 3.14],
    ])(
      'if provided value is not a valid %s',
      async (expectedArgumentKind, argument) => {
        console.log = jest.fn();
        await isEven(Number(argument)).then(() =>
          expect(console.log).toBeCalledWith(
            'Provided number is not an integer!'
          )
        );
      }
    );
  });

  describe('resolves', () => {
    it.each([
      ['odd', false, 1],
      ['even', true, 2],
    ])(
      'and if provided value is a valid %s number the Promise returns %s',
      async (numberKind, expectedResult, argument) => {
        await isEven(argument).then((result) =>
          expect(result).toBe(expectedResult)
        );
      }
    );
  });
});

describe('slowIsEven', () => {
  describe('rejects after 1 second', () => {
    it.each([
      ['number', 'test'],
      ['integer', 3.14],
    ])(
      'if provided value is not a valid %s',
      async (expectedArgumentKind, argument) => {
        console.log = jest.fn();
        await slowIsEven(Number(argument), 1000).then(() =>
          expect(console.log).toBeCalledWith(
            'Provided number is not an integer!'
          )
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
        await slowIsEven(argument, 1000).then((resultAfterTimeout) =>
          expect(resultAfterTimeout).toBe(expectedResult)
        );
      }
    );
  });
});

describe('timeout', () => {
  it("resolves the provided promises and returnes it's returned value", async () =>
    await timeout(slowIsEven(5, 1000), 3000).then((resultAfterTimeout) =>
      expect(resultAfterTimeout).toBe(false)
    ));

  it('rejects the provided promises after two seconds', async () => {
    console.log = jest.fn();
    await timeout(slowIsEven(5, 4000), 2000).then(() =>
      expect(console.log).toBeCalledWith('The promise took too long!')
    );
  });
});
