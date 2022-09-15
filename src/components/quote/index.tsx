import React from 'react';
import './styles.scss';

type QuotePropsType = {
  text: string;
  author: string;
};

export const Quote: React.FC<QuotePropsType> = ({ text, author }) => {
  return (
    <figure className="quote">
      <blockquote>{text}</blockquote>
      <figure className="quote__author">
        <cite>{author}</cite>
      </figure>
    </figure>
  );
};
