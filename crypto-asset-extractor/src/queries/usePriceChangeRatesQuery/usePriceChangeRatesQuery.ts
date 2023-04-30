import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "src/queries";
import data from "./data.json";

type Response = CMCResponse<{ [id: string]: PriceChangeRate }>;

const fetchPriceChangeRates = (symbols: string[], convert: string) => {
  console.log(symbols, convert);

  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

type QueryArgs = {
  symbols: string[];
  convert: string;
};
export const usePriceChangeRatesQuery = ({ symbols, convert }: QueryArgs) => {
  return useQuery(
    [QUERY_KEYS.PRICE_CHANGE_RATES, symbols, convert],
    () => fetchPriceChangeRates(symbols, convert),
    {
      refetchInterval: 5 * 1000, // 5 seconds
    }
  );
};
