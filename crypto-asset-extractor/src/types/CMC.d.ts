type Coin = {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
};

type QuoteByFiat = {
  [convert: string]: {
    price: number;
    percent_change_24h: number;
    percent_change_7d: number;
    last_updated: string;
  };
};

type CoinPriceQuote = {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: QuoteByFiat;
};
