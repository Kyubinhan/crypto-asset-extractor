import React from "react";
import { usePriceChangeRatesQuery } from "src/queries";

interface Props {
  symbols: string[];
  convert?: string;
}

const PriceChangeRateTable: React.FC<Props> = ({
  symbols,
  convert = "KRW",
}) => {
  const { data } = usePriceChangeRatesQuery({ symbols, convert });

  if (!data) return null;

  const { status, data: assetMap } = data;

  const cryptoAssets = Object.values(assetMap);

  return (
    <div style={{ marginTop: 12 }}>
      Requested Time {status.timestamp}
      {cryptoAssets.map((asset) => {
        const quote = asset.quote[convert];

        return (
          <div key={asset.id}>
            {asset.name} ₩{quote.price.toFixed(2)}{" "}
            {quote.percent_change_24h.toFixed(2)}%{" "}
            {quote.percent_change_7d.toFixed(2)}%
          </div>
        );
      })}
    </div>
  );
};

export default PriceChangeRateTable;
