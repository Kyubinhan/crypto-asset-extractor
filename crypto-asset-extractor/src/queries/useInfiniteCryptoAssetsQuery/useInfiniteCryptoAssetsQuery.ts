import { useInfiniteQuery } from "@tanstack/react-query";
// import axios from "axios";

import { QUERY_KEYS } from "src/queries";
import data from "./data.json";

type Response = CMCResponse<CryptoAsset[]> & { pageParam: number };

const TOTAL_COUNT = 100;
const SIZE = 15;
export const CRYPTO_ASSET_TOTAL_PAGE = Math.floor(TOTAL_COUNT / SIZE) + 1;

const fetchCryptoAssets = async ({ pageParam = 0 }) => {
  const start = 1 + pageParam * SIZE;
  const limit = Math.min(SIZE * (pageParam + 1), TOTAL_COUNT);

  // const { data } = await axios.get<Response>("/api/cmc", {
  //   params: {
  //     endpoint: "v1/cryptocurrency/map",
  //     listing_status: "active",
  //     sort: "cmc_rank",
  //     start,
  //     limit,
  //   },
  // });

  // return { ...data, pageParam };

  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve({ ...data, pageParam });
    }, 500);
  });
};

export const useInfiniteCryptoAssetsQuery = () => {
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
