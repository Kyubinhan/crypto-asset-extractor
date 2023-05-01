import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

import { useCoinLogoMapQuery, usePriceChangeRatesQuery } from "src/queries";

import styles from "./style.module.scss";

interface Props {
  symbols: string[];
  convert?: string;
}

const PriceChangeRateTable: React.FC<Props> = ({
  symbols,
  convert = "KRW",
}) => {
  const { data } = usePriceChangeRatesQuery({ symbols, convert });
  const { data: logoMap } = useCoinLogoMapQuery();

  if (!data) return null;

  const { status, data: assetMap } = data;

  const cryptoAssets = Object.values(assetMap);

  const requestTime = dayjs(status.timestamp)
    .format("YYYY.MM.DD HH:mm:ss.SSS")
    .slice(0, -1);
  const responseTime = dayjs(status.timestamp)
    .add(status.elapsed, "millisecond")
    .format("YYYY.MM.DD HH:mm:ss.SSS")
    .slice(0, -1);

  return (
    <div>
      <div className={styles.timestamps}>
        <div>
          <span className={styles.label}>Request Time</span>
          <span className={styles.timestamp}>{requestTime}</span>
        </div>
        <div>
          <span className={styles.label}>Response Time</span>
          <span className={styles.timestamp}>{responseTime}</span>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <span>코인</span>
          <span>가격</span>
          <span>24h(%)</span>
          <span>7d(%)</span>
        </div>
        {cryptoAssets.map((asset) => {
          const quote = asset.quote[convert];
          const price = new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 2,
          }).format(quote.price);
          const pc24h = quote.percent_change_24h;
          const pc7d = quote.percent_change_7d;

          return (
            <div key={asset.id} className={styles.row}>
              <span>
                <Image
                  src={logoMap[asset.symbol]}
                  width={24}
                  height={24}
                  alt="coin logo"
                />
                {asset.symbol}
              </span>
              <span>₩{price}</span>
              <span className={clsx({ [styles.minus]: pc24h < 0 })}>
                {pc24h.toFixed(2)}%
              </span>
              <span className={clsx({ [styles.minus]: pc7d < 0 })}>
                {pc7d.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceChangeRateTable;
