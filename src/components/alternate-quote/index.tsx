import React from 'react';
import './styles.scss';

interface AlternateQuoteInterface {
  text: string;
  author: string;
}

export const AlternateQuote: React.FC<AlternateQuoteInterface> = ({
  text,
  author,
}) => {
  return (
    <div className="alternateQuote">
      <h2 className="alternateQuote__text">{text}</h2>
      <div className="alternateQuote__author">
        <span>{author}</span>
      </div>
    </div>
  );
};
