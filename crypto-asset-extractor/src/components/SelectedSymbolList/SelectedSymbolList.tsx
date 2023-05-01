import React from "react";

import SelectedSymbol from "src/components/SelectedSymbol/SelectedSymbol";
import S from "./style.module.scss";

interface Props {
  symbols: string[];
  toggle: (symbol: string) => void;
  canUnselect: boolean;
}

const SelectedSymbolList: React.FC<Props> = ({
  symbols,
  toggle,
  canUnselect,
}) => {
  return (
    <div className={S["symbol-list"]}>
      {symbols.sort().map((symbol) => (
        <SelectedSymbol
          key={symbol}
          canUnselect={canUnselect}
          symbol={symbol}
          toggle={toggle}
        />
      ))}
    </div>
  );
};

export default SelectedSymbolList;
