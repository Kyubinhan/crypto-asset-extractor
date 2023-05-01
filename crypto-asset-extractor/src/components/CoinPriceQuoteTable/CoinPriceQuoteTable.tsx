import React from "react";

import CoinPriceQuoteRow from "src/components/CoinPriceQuoteTable/CoinPriceQuoteRow";
import RequestTimestamps from "src/components/CoinPriceQuoteTable/RequestTimestamps";
import { useCoinLogoMapQuery, useCoinPriceQuotesQuery } from "src/queries";

import S from "./style.module.scss";

interface Props {
  symbols: string[];
  convert?: string;
}

const CoinPriceQuoteTable: React.FC<Props> = ({ symbols, convert = "KRW" }) => {
  const { data } = useCoinPriceQuotesQuery({ symbols, convert });
  const { data: logoMap } = useCoinLogoMapQuery();

  if (!data) return null;

  const { status, data: quoteMap } = data;

  const coins = Object.values(quoteMap);

  return (
    <div>
      <RequestTimestamps status={status} />
      <div className={S.table}>
        <div className={S.header}>
          <span>코인</span>
          <span>가격</span>
          <span>24h(%)</span>
          <span>7d(%)</span>
        </div>
        {coins.map((coin) => {
          const logoUrl = logoMap?.[coin.symbol];

          return (
            <CoinPriceQuoteRow
              key={coin.id}
              coin={coin}
              convert={convert}
              logoUrl={logoUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CoinPriceQuoteTable;
