import React from 'react';
import { TimeboxList, EditableTimebox } from '..';
import './styles.css';

export function App() {
  return (
    <div className="App">
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}
