import React from "react";
import { useSelectedSymbolStore } from "src/hooks/useSelectedCryptoAssetStore";
import { CRYPTO_ASSET_TOTAL_PAGE, useInfiniteCryptoAssets } from "src/queries";

const CryptoAssetList: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCryptoAssets();
  const { selected, toggle } = useSelectedSymbolStore();
  const selectedSymbols = Object.entries(selected)
    .filter(([_, checked]) => checked)
    .map(([symbol]) => symbol);

  if (!data) return null;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.pages.map((group, pageIdx) => {
          return (
            <React.Fragment key={pageIdx}>
              {group.data.map((asset) => (
                <div key={asset.id} style={{ padding: 12 }}>
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    checked={Boolean(selected[asset.symbol])}
                    onChange={() => toggle(asset.symbol)}
                  />
                  {asset.name} {asset.symbol}
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        더 보기({data.pages.length} / {CRYPTO_ASSET_TOTAL_PAGE})
      </button>
      <div style={{ marginTop: 12 }}>{selectedSymbols.join(", ")}</div>
    </div>
  );
};

export default CryptoAssetList;
