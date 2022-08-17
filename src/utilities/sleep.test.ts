import { sleep } from '.';

type TestSamplesType = {
  onSuccess: typeof jest.mock;
  onError: typeof jest.mock;
};

describe('sleep', () => {
  let testSamples: TestSamplesType;
  beforeEach(() => {
    testSamples = {
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };
  });

  describe('fires onSuccess callback', () => {
    it.each([
      [5, 10],
      [2000, 2010],
      [4000, 4010],
    ])(
      'when provided time-out takes %s milliseconds',
      async (timeout, testTimeout) => {
        sleep(timeout, testSamples.onSuccess, testSamples.onError);

        await new Promise<TestSamplesType>((resolve) =>
          setTimeout(() => resolve(testSamples), testTimeout)
        ).then(() => expect(testSamples.onSuccess).toBeCalledTimes(1));
      }
    );
  });

  describe('fires onError callback', () => {
    it.each([
      [4, 8],
      [4001, 4010],
    ])(
      'when provided time-out takes %s milliseconds',
      async (timeout, testTimeout) => {
        sleep(timeout, testSamples.onSuccess, testSamples.onError);

        await new Promise<TestSamplesType>((resolve) =>
          setTimeout(() => resolve(testSamples), testTimeout)
        ).then(() => expect(testSamples.onError).toBeCalledTimes(1));
      }
    );
  });
});
