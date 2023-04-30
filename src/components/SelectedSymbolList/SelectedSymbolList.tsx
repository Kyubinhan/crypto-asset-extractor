import React from "react";
import {
  getSelectedSymbols,
  useSelectedSymbolStore,
} from "src/hooks/useSelectedCryptoAssetStore";

interface Props {
  mode: "view" | "edit";
}

const SelectedSymbolList: React.FC<Props> = ({ mode }) => {
  const { selected, toggle } = useSelectedSymbolStore();
  const symbols = getSelectedSymbols(selected);

  return (
    <div style={{ marginTop: 12, display: "flex" }}>
      {symbols.map((symbol) => (
        <div key={symbol} style={{ padding: 4 }}>
          {symbol}
          {mode === "edit" && <button onClick={() => toggle(symbol)}>x</button>}
        </div>
      ))}
    </div>
  );
};

export default SelectedSymbolList;
