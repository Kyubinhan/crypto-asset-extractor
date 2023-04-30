type Quote = {
  [convert: string]: {
    price: number;
    percent_change_24h: number;
    percent_change_7d: number;
    last_updated: string;
  };
};

type PriceChangeRate = {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: Quote;
};
