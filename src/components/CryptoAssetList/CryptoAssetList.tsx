import React from "react";
import { useSelectedSymbolStore } from "src/hooks/useSelectedCryptoAssetStore";
import { CRYPTO_ASSET_TOTAL_PAGE, useInfiniteCryptoAssets } from "src/queries";

interface Props {}

const CryptoAssetList: React.FC<Props> = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCryptoAssets();
  const { selected, toggle } = useSelectedSymbolStore();

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
    </div>
  );
};

export default CryptoAssetList;
