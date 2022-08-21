import { getLettersWithNumbers } from '.';

describe('getLettersWithNumbers', () => {
  describe('returns the correct value', () => {
    it('and when an empty string is provided, it gives it back', () => {
      const result = getLettersWithNumbers('');

      expect(result).toBe('');
    });

    it.each([
      ['aaaabbbccca', 'a4b3c3a1'],
      ['abcdefgh', 'a1b1c1d1e1f1g1h1'],
      ['abbcccddddeeeeeffffff', 'a1b2c3d4e5f6'],
      ['!@@###$%^&***()', '!1@2#3$1%1^1&1*3(1)1'],
      ['a@@# #$%&*2(()', 'a1@2#1 1#1$1%1&1*121(2)1'],
    ])('and if %s is provided, it gives %s', (input, output) => {
      const result = getLettersWithNumbers(input);

      expect(result).toBe(output);
    });
  });
});
