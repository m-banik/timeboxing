import React from 'react';
import { Header } from '../header';
import { TimeboxContainer } from '../timebox-container';
import { EditableTimebox } from '../editable-timebox';
import { InspirationalQuote } from '../inspirational-quote';

export const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Header />
      <TimeboxContainer />
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
};
