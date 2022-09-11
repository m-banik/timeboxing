import React from 'react';
import { Header, TimeboxList, EditableTimebox, InspirationalQuote } from '..';

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
