import React from 'react';
import { ErrorMessage } from '../error-message';
import { LoadingSpinner } from '../loading-spinner';
import './styles.scss';

type QuoteType = {
  text: string;
  author: string;
};

export const InspirationalQuote: React.FC = () => {
  const [quote, setQuote] = React.useState<QuoteType | null>(null);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    import('inspirational-quotes')
      .then((Quotes) => {
        const quote = Quotes.default.getQuote();

        setQuote(quote);
      })
      .catch(() => setHasError(true));
  }, []);

  if (hasError) {
    return (
      <ErrorMessage
        hasError={hasError}
        message={'An error occurred in the inspirational quote feature.'}
      />
    );
  }

  if (!quote) {
    return <LoadingSpinner fullWidth />;
  }

  const { text, author } = quote;

  return (
    <figure className="inspirationalQuote">
      <blockquote>{text}</blockquote>
      <figure className="inspirationalQuote__author">
        <cite>{author}</cite>
      </figure>
    </figure>
  );
};
