import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "src/queries";
// import data from "./data.json";

type Response = CMCResponse<{ [symbol: string]: PriceChangeRate }>;

const fetchPriceChangeRates = async (symbols: string[], convert: string) => {
  const { data } = await axios.get<Response>("api/cmc", {
    params: {
      endpoint: "v1/cryptocurrency/quotes/latest",
      symbol: symbols.join(","),
      aux: "cmc_rank",
      convert,
    },
  });

  return data;

  // return new Promise<Response>((resolve) => {
  //   setTimeout(() => {
  //     resolve(data);
  //   }, 200);
  // });
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
      enabled: symbols.length > 0,
    }
  );
};
