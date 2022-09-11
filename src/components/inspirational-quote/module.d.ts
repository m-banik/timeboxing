// Temporary solution: Custom types for the 'inspirational-quotes' library.

type FullOptionsType = {
  author: true;
};

type FullQuoteType = {
  text: string;
  author: string;
};

type GetFullQuoteType = (options?: FullOptionsType) => FullQuoteType;

type PartialOptionsType = {
  author: false;
};

type PartialQuoteType = Omit<FullQuoteType, 'author'>;

type GetPartialQuoteType = (options: PartialOptionsType) => PartialQuoteType;

type GetQuoteType = GetFullQuoteType & GetPartialQuoteType;

type GetRandomQuoteType = () => string;

declare module 'inspirational-quotes' {
  const getQuote: GetQuoteType;
  const getRandomQuote: GetRandomQuoteType;

  export default { getQuote, getRandomQuote };
}
