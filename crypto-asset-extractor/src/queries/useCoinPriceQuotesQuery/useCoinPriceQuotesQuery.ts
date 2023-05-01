import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "src/queries";
import mockData from "./data.json";

type Response = CMCResponse<{ [symbol: string]: CoinPriceQuote }>;

const fetchCoinPriceQuotes = async (symbols: string[], convert: string) => {
  if (process.env.NEXT_PUBLIC_USE_CMC_MOCK_DATA === "true") {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 200);
    });
  }

  const { data } = await axios.get<Response>("api/cmc", {
    params: {
      endpoint: "v1/cryptocurrency/quotes/latest",
      symbol: symbols.join(","),
      aux: "cmc_rank",
      convert,
    },
  });

  return data;
};

type QueryArgs = {
  symbols: string[];
  convert: string;
};
export const useCoinPriceQuotesQuery = ({ symbols, convert }: QueryArgs) => {
  return useQuery(
    [QUERY_KEYS.COIN_PRICE_Quotes, symbols, convert],
    () => fetchCoinPriceQuotes(symbols, convert),
    {
      refetchInterval: 5 * 1000, // 5 seconds
      enabled: symbols.length > 0,
    }
  );
};
