import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { SelectedSymbolState } from "src/hooks";
import {
  CRYPTO_ASSET_TOTAL_PAGE,
  useCoinLogoMapQuery,
  useInfiniteCryptoAssetsQuery,
} from "src/queries";

import styles from "./style.module.scss";

interface Props {
  selected: SelectedSymbolState["selected"];
  toggle: SelectedSymbolState["toggle"];
  hidden: boolean;
}

const CryptoAssetList: React.FC<Props> = ({ selected, toggle, hidden }) => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCryptoAssetsQuery();
  const { data: logoMap } = useCoinLogoMapQuery();

  if (!data || hidden) return null;

  return (
    <div className={styles["list-wrapper"]}>
      <div className={styles["card-list"]}>
        {data.pages.map((group, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {group.data.map((asset) => {
              const isSelected = Boolean(selected[asset.symbol]);

              return (
                <button
                  key={asset.id}
                  className={clsx(styles.card, {
                    [styles.selected]: isSelected,
                  })}
                  onClick={() => toggle(asset.symbol)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    // To silence the onChange missing console error
                    onChange={() => {}}
                  />
                  <Image
                    src={logoMap[asset.symbol]}
                    width={32}
                    height={32}
                    alt="coin logo"
                  />
                  <div className={styles.text}>
                    <span className={styles.name}>{asset.name}</span>
                    <span className={styles.symbol}>{asset.symbol}</span>
                  </div>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <button
        className={styles["more-btn"]}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        더보기({data.pages.length}/{CRYPTO_ASSET_TOTAL_PAGE}){" "}
        <Image
          src="/images/chevron-arrow-down.svg"
          width={10}
          height={10}
          alt="arrow down icon"
        />
      </button>
    </div>
  );
};

export default CryptoAssetList;
