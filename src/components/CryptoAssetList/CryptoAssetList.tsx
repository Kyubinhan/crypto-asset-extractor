import React from "react";
import { TOTAL_PAGE, useInfiniteCryptoAssets } from "src/queries";

const CryptoAssetList: React.FC = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteCryptoAssets();

  if (!data) return null;

  return (
    <div>
      {data.pages.map((group, pageIdx) => {
        return (
          <React.Fragment key={pageIdx}>
            {group.data.map((asset) => (
              <div key={asset.id} style={{ padding: 12 }}>
                <input type="checkbox" id="scales" name="scales" />
                {asset.name} {asset.symbol}
              </div>
            ))}
          </React.Fragment>
        );
      })}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        더 보기({data.pages.length} / {TOTAL_PAGE})
      </button>
    </div>
  );
};

export default CryptoAssetList;
