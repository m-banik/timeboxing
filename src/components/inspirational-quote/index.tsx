import React from 'react';
import { ErrorMessage, LoadingSpinner } from '..';
import './styles.scss';

type QuoteType = {
  text: string;
  author: string;
};

type InspirationalQuoteStateType = {
  quote: QuoteType | null;
  hasError: boolean;
};

export class InspirationalQuote extends React.Component<
  {},
  InspirationalQuoteStateType
> {
  state = {
    quote: null,
    hasError: false,
  };

  componentDidMount() {
    import('inspirational-quotes')
      .then((Quotes) => {
        const quote = Quotes.default.getQuote();

        this.setState((prevState) => ({ ...prevState, quote }));
      })
      .catch(() =>
        this.setState((prevState) => ({ ...prevState, hasError: true }))
      );
  }

  render() {
    const { quote, hasError } = this.state;

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
  }
}
