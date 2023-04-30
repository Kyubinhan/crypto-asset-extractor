import React from "react";
import { SelectedSymbolState } from "src/hooks";
import { CRYPTO_ASSET_TOTAL_PAGE, useInfiniteCryptoAssets } from "src/queries";

interface Props {
  selected: SelectedSymbolState["selected"];
  toggle: SelectedSymbolState["toggle"];
}

const CryptoAssetList: React.FC<Props> = ({ selected, toggle }) => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCryptoAssets();

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
