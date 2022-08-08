import React from 'react';
import { ErrorBoundary, TimeboxList, EditableTimebox } from '..';
import './styles.scss';

export function App() {
  return (
    <div className="App">
      <ErrorBoundary message={'Something went wrong...'}>
        <TimeboxList />
        <EditableTimebox />
      </ErrorBoundary>
    </div>
  );
}
