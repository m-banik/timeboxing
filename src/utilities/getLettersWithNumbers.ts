export const getLettersWithNumbers = (input: string): string => {
  let [output, instance] = ['', input];

  while (instance.length) {
    for (let i = 0; instance.length > 0; ++i) {
      if (instance.length === 1) {
        output += `${instance}1`;
        instance = '';
        break;
      }

      if (i === 0) {
        continue;
      }

      const currentLetter = instance.charAt(i);
      const previousLetter = instance.charAt(i - 1);

      if (previousLetter !== currentLetter) {
        output += `${previousLetter}${i}`;

        instance = instance.slice(i);
        break;
      }
    }
  }

  return output;
};
