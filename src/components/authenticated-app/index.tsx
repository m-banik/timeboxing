import React from 'react';
import { Header } from '../header';
import { TimeboxContainer } from '../timebox-container';
import { EditableTimebox } from '../editable-timebox';
import { AlternateQuote } from '../alternate-quote';
import { InspirationalQuote } from '../inspirational-quote';

export const AuthenticatedApp: React.FC = () => {
  const renderQuote = React.useCallback(
    (text: string, author: string) => (
      <AlternateQuote text={text} author={author} />
    ),
    []
  );

  return (
    <>
      <Header />
      <TimeboxContainer />
      <EditableTimebox />
      <InspirationalQuote renderQuote={renderQuote} />
    </>
  );
};
