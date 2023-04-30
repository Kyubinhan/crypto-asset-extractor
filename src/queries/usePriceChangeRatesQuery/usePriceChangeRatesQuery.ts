import { useQuery } from "react-query";

import { QUERY_KEYS } from "src/queries";
import data from "./data.json";

type Response = CMCResponse<{ [id: string]: PriceChangeRate }>;

const fetchPriceChangeRates = (
  symbols: string[],
  convert: string
): Response => {
  return data;
};

type QueryArgs = {
  symbols: string[];
  convert?: string;
};
export const usePriceChangeRatesQuery = ({
  symbols,
  convert = "KRW",
}: QueryArgs) => {
  return useQuery(
    [QUERY_KEYS.PRICE_CHANGE_RATES, symbols, convert],
    () => fetchPriceChangeRates(symbols, convert),
    {
      refetchInterval: 5 * 1000, // 5 seconds
    }
  );
};
