export type SleepType = (
  ms: number,
  onSucces: Function,
  onError: Function
) => void;

export const sleep: SleepType = (ms, onSucces, onError) => {
  if (ms < 5 || ms > 4000) {
    setTimeout(() => onError(), ms);
  } else {
    setTimeout(() => onSucces(), ms);
  }
};
