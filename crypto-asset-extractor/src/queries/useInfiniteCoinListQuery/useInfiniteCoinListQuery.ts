import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUERY_KEYS } from "src/queries";
import mockData from "./data.json";

type Response = CMCResponse<Coin[]> & { pageParam: number };

const TOTAL_NUM_OF_COINS = 100;
export const getCoinListTotalPage = (pageSize: number) =>
  Math.ceil(TOTAL_NUM_OF_COINS / pageSize);

const fetchPaginatedCoinList = async (pageParam: number, pageSize: number) => {
  if (process.env.NEXT_PUBLIC_USE_CMC_MOCK_DATA === "true") {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve({ ...mockData, pageParam });
      }, 1000);
    });
  }

  const start = 1 + pageParam * pageSize;
  const limit = Math.min(pageSize * (pageParam + 1), TOTAL_NUM_OF_COINS);

  const { data } = await axios.get<Response>("/api/cmc", {
    params: {
      endpoint: "v1/cryptocurrency/map",
      listing_status: "active",
      sort: "cmc_rank",
      start,
      limit,
    },
  });

  return { ...data, pageParam };
};

type QueryArgs = {
  pageSize: number;
};
export const useInfiniteCoinListQuery = ({ pageSize }: QueryArgs) => {
  return useInfiniteQuery(
    [QUERY_KEYS.PAGINATED_COIN_LIST, pageSize],
    ({ pageParam = 0 }) => fetchPaginatedCoinList(pageParam, pageSize),
    {
      getNextPageParam: ({ pageParam = 0 }) => {
        const currPage = pageParam + 1;
        const totalPage = getCoinListTotalPage(pageSize);

        if (currPage < totalPage) {
          return pageParam + 1;
        }

        return undefined;
      },
    }
  );
};
