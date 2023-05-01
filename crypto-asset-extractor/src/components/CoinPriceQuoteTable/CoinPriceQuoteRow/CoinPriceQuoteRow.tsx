import clsx from "clsx";
import Image from "next/image";
import React from "react";

import S from "./style.module.scss";

interface Props {
  coin: CoinPriceQuote;
  convert: string;
  logoUrl: string | undefined;
}

const CoinPriceQuoteRow: React.FC<Props> = ({ coin, convert, logoUrl }) => {
  const quote = coin.quote[convert];
  const price = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(quote.price);
  const pc24h = quote.percent_change_24h;
  const pc7d = quote.percent_change_7d;

  return (
    <div className={S.row}>
      <span>
        {logoUrl && (
          <Image src={logoUrl} width={24} height={24} alt="coin logo" />
        )}
        {coin.symbol}
      </span>
      <span>₩{price}</span>
      <span className={clsx({ [S.minus]: pc24h < 0 })}>
        {pc24h.toFixed(2)}%
      </span>
      <span className={clsx({ [S.minus]: pc7d < 0 })}>{pc7d.toFixed(2)}%</span>
    </div>
  );
};

export default React.memo(CoinPriceQuoteRow);
