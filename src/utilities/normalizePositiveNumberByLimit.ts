export const normalizePositiveNumberByLimit = (value: number, limit = 60) => {
  if (value < 0) {
    return 0;
  }

  if (value >= limit) {
    return limit - 1;
  }

  return value;
};
