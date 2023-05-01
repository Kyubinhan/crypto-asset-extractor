import React from "react";

import CoinCard from "src/components/CoinCard";
import MoreButton from "src/components/CoinCardListView/MoreButton";
import {
  CRYPTO_ASSET_TOTAL_PAGE,
  useCoinLogoMapQuery,
  useInfiniteCoinListQuery,
} from "src/queries";

import styles from "./style.module.scss";

interface Props {
  selected: Record<string, boolean>;
  toggle: (symbol: string) => void;
  hidden: boolean;
}

const CoinCardListView: React.FC<Props> = ({ selected, toggle, hidden }) => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCoinListQuery();
  const { data: logoMap } = useCoinLogoMapQuery();

  if (!data || hidden) return null;

  return (
    <div className={styles["list-wrapper"]}>
      <div className={styles["card-list"]}>
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
        label={`더보기(${data.pages.length}/${CRYPTO_ASSET_TOTAL_PAGE})`}
        handleClick={fetchNextPage}
        disabled={!hasNextPage || isFetching}
      />
    </div>
  );
};

export default CoinCardListView;
