import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWithErrorBoundary } from './components/App';
import './styles/main.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppWithErrorBoundary message={'Something went wrong...'} />
    </React.StrictMode>
  );
}
