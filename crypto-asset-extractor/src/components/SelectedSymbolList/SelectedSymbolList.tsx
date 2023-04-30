import React from "react";
import { SelectedSymbolState } from "src/hooks";

interface Props {
  symbols: string[];
  toggle: SelectedSymbolState["toggle"];
  isToggleAble: boolean;
}

const SelectedSymbolList: React.FC<Props> = ({
  symbols,
  toggle,
  isToggleAble,
}) => {
  return (
    <div style={{ marginTop: 12, display: "flex" }}>
      {symbols.map((symbol) => (
        <div key={symbol} style={{ padding: 4 }}>
          {symbol}
          {isToggleAble && <button onClick={() => toggle(symbol)}>x</button>}
        </div>
      ))}
    </div>
  );
};

export default SelectedSymbolList;
