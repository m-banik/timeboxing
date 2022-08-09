type GetMinutesAndSecondsFromDurationInSecondsType = (
  durationInSeconds: number
) => [minutes: number, seconds: number];

export const getMinutesAndSecondsFromDurationInSeconds: GetMinutesAndSecondsFromDurationInSecondsType =
  (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return [minutes, seconds];
  };
