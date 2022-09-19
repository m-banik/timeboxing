import React from 'react';
import { Header } from '../header';
import { TimeboxContainer } from '../timebox-container';
import { Quote } from '../quote';
import { AlternateQuote } from '../alternate-quote';
import { InspirationalQuote } from '../inspirational-quote';

export const AuthenticatedApp: React.FC = () => {
  const renderQuote = React.useCallback(
    (text: string, author: string) => <Quote text={text} author={author} />,
    []
  );

  const renderAlternateQuote = React.useCallback(
    (text: string, author: string) => (
      <AlternateQuote text={text} author={author} />
    ),
    []
  );

  return (
    <>
      <Header />
      <TimeboxContainer />
      <InspirationalQuote
        renderQuote={Math.random() < 0.5 ? renderQuote : renderAlternateQuote}
      />
    </>
  );
};
