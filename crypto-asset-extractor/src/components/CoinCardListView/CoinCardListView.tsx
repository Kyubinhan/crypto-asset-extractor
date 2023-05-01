import clsx from "clsx";
import React from "react";

import CoinCard from "src/components/CoinCard";
import MoreButton from "src/components/CoinCardListView/MoreButton";
import { useMediaQuery } from "src/hooks";
import {
  getCoinListTotalPage,
  useCoinLogoMapQuery,
  useInfiniteCoinListQuery,
} from "src/queries";

import S from "./style.module.scss";

const DESKTOP_PAGE_SIZE = 15;
const MOBILE_PAGE_SIZE = 5;

interface Props {
  selected: Record<string, boolean>;
  toggle: (symbol: string) => void;
  hidden: boolean;
}

const CoinCardListView: React.FC<Props> = ({ selected, toggle, hidden }) => {
  const isMobile = useMediaQuery("(max-width: 375px)");
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCoinListQuery({ pageSize });
  const { data: logoMap } = useCoinLogoMapQuery();

  if (!data) return null;

  return (
    <div className={clsx(S["card-list-view"], { [S.hidden]: hidden })}>
      <div className={S["card-list"]}>
        {data.pages.map((group, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {group.data.map((coin) => {
              const isSelected = Boolean(selected[coin.symbol]);
              const logoUrl = logoMap?.[coin.symbol];

              return (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  isSelected={isSelected}
                  logoUrl={logoUrl}
                  toggle={toggle}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <MoreButton
        label={`더보기(${data.pages.length}/${getCoinListTotalPage(pageSize)})`}
        handleClick={fetchNextPage}
        disabled={!hasNextPage || isFetching}
      />
    </div>
  );
};

export default CoinCardListView;
