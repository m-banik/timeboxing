import { xxx } from './xxx';

describe('xxx', () => {
  describe('returns the argument', () => {
    it('when an empty was provided ', () => {
      const instance = xxx('');
      expect(instance).toBe('');
    });
  });

  describe('returns the reversed string argument', () => {
    it('when "abcdef" was provided', () => {
      const instance = xxx('abcdef');
      expect(instance).toBe('fedcba');
    });
  });
});
