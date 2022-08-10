import { fizzBuzz } from '.';

describe('fizzBuzz', () => {
  describe('returns Fizz', () => {
    it('when multiplication of 3 is provided as an argument', () => {
      const instance = fizzBuzz(6);
      expect(instance).toBe('Fizz');
    });
  });

  describe('returns Buzz', () => {
    it('when multiplication of 5 is provided as an argument', () => {
      const instance = fizzBuzz(-20);
      expect(instance).toBe('Buzz');
    });
  });

  describe('returns FizzBuzz', () => {
    it('when multiplication of both 3 and 5 is provided as an argument', () => {
      const instance = fizzBuzz(15);
      expect(instance).toBe('FizzBuzz');
    });
  });

  describe('returns the argument', () => {
    it('when multiplication neither of 3 or 5 is provided as an argument', () => {
      const instance = fizzBuzz(2);
      expect(instance).toBe(2);
    });
  });
});
