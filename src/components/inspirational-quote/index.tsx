import React from 'react';
import { ErrorMessage } from '../error-message';
import { LoadingSpinner } from '../loading-spinner';
import { Quote } from '../quote';

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

  return quote ? <Quote {...quote} /> : <LoadingSpinner fullWidth />;
};
