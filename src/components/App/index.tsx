import React from 'react';
import { TimeboxList, EditableTimebox } from '..';
import './styles.scss';

export function App() {
  return (
    <div className="App">
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}
