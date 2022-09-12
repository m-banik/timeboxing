import { getMinutesAndSecondsFromDurationInSeconds } from './getMinutesAndSecondsFromDurationInSeconds';

describe('getMinutesAndSecondsFromDurationInSeconds', () => {
  describe('for duration shorter than 1 minute', () => {
    const instance = getMinutesAndSecondsFromDurationInSeconds(30);

    it('returns 0 minutes when duration lasts 30 seconds', () => {
      expect(instance[0]).toBe(0);
    });

    it('returns 30 seconds when duration lasts 30 seconds', () => {
      expect(instance[1]).toBe(30);
    });
  });

  describe('for duration equal to 1 minute', () => {
    const instance = getMinutesAndSecondsFromDurationInSeconds(60);

    it('returns 1 minutes when duration lasts 60 seconds', () => {
      expect(instance[0]).toBe(1);
    });

    it('returns 0 seconds when duration lasts 60 seconds', () => {
      expect(instance[1]).toBe(0);
    });
  });

  describe('for duration longer than 1 minute', () => {
    const instance = getMinutesAndSecondsFromDurationInSeconds(30);

    it('returns 2 minutes when duration lasts 140 seconds', () => {
      expect(instance[0]).toBe(0);
    });

    it('returns 20 seconds when duration lasts 140 seconds', () => {
      expect(instance[1]).toBe(30);
    });
  });
});
