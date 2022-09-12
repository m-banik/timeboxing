import { fib } from './fib';

describe('fib', () => {
  describe('returns the argument when 1 is provided at most', () => {
    it('when -0.5 was provided', () => {
      const instance = fib(-0.5);
      expect(instance).toBe(-0.5);
    });

    it('when 0 was provided', () => {
      const instance = fib(0);
      expect(instance).toBe(0);
    });

    it('when 1 was provided', () => {
      const instance = fib(1);
      expect(instance).toBe(1);
    });
  });

  describe("returns the correct sum of the two previous serie's numbers", () => {
    it('when 2 was provided it returns 1', () => {
      const instance = fib(2);
      expect(instance).toBe(1);
    });

    it('when 3 was provided it returns 2', () => {
      const instance = fib(3);
      expect(instance).toBe(2);
    });

    it('when 4 was provided it returns 3', () => {
      const instance = fib(4);
      expect(instance).toBe(3);
    });
  });
});
