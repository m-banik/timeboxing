import { TimeboxType } from '.';
import { nanoid } from '../utils';

export const timeboxesSamples: TimeboxType[] = [
  {
    id: nanoid(),
    title: 'Uczę się skrótów klawiszowych',
    totalTimeInMinutes: 25,
  },
  {
    id: nanoid(),
    title: 'Uczę się gita',
    totalTimeInMinutes: 10,
  },
  {
    id: nanoid(),
    title: 'Uczę się Reakta',
    totalTimeInMinutes: 5,
  },
];
