import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { QUERY_KEYS } from "src/queries";

const fetchLogos = async () => {
  const { data } = await axios.get("api/coinLogoMap");

  return data;
};

export const useCoinLogoMapQuery = () => {
  return useQuery([QUERY_KEYS.COIN_LOGO_MAP], fetchLogos, {
    staleTime: Infinity,
  });
};
