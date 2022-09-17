import React from 'react';
import { ErrorMessage } from '../error-message';
import { LoadingSpinner } from '../loading-spinner';

type QuoteType = {
  text: string;
  author: string;
};

interface InspirationalQuoteInterface {
  renderQuote: (text: string, uthor: string) => JSX.Element;
}

export const InspirationalQuote: React.FC<InspirationalQuoteInterface> = ({
  renderQuote,
}) => {
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

  return quote ? (
    renderQuote(quote.text, quote.author)
  ) : (
    <LoadingSpinner fullWidth />
  );
};
