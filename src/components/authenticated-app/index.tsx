import React from 'react';
import { Header } from '../header';
import { TimeboxList } from '../timebox-list';
import { EditableTimebox } from '../editable-timebox';
import { InspirationalQuote } from '../inspirational-quote';

export const AuthenticatedApp: React.FC = () => {
  return (
    <>
      <Header />
      <TimeboxList />
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
};
