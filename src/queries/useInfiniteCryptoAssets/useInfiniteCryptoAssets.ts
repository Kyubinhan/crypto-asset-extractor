import { useInfiniteQuery } from "react-query";

import { QUERY_KEYS } from "src/queries";
import data from "./data.json";

type Response = CMCResponse<CryptoAsset> & { pageParam: number };

const TOTAL_COUNT = 20;
const SIZE = 15;
export const CRYPTO_ASSET_TOTAL_PAGE = Math.floor(TOTAL_COUNT / SIZE) + 1;

const fetchCryptoAssets = ({ pageParam = 0 }) => {
  const start = 1 + pageParam * SIZE;
  const limit = Math.min(SIZE * (pageParam + 1), TOTAL_COUNT);

  console.log(pageParam, start, limit);

  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve({ ...data, pageParam });
    }, 500);
  });
};

export const useInfiniteCryptoAssets = () => {
  return useInfiniteQuery([QUERY_KEYS.CRYPTO_ASSETS], fetchCryptoAssets, {
    getNextPageParam: ({ pageParam = 0 }) => {
      const currPage = pageParam + 1;
      if (currPage < CRYPTO_ASSET_TOTAL_PAGE) {
        return pageParam + 1;
      }

      return undefined;
    },
  });
};
