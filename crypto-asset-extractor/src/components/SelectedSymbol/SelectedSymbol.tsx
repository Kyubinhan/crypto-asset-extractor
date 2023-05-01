import Image from "next/image";
import React from "react";

import S from "./style.module.scss";

interface Props {
  symbol: string;
  toggle: (symbol: string) => void;
  canUnselect: boolean;
}

const SelectedSymbol: React.FC<Props> = ({ symbol, toggle, canUnselect }) => {
  return (
    <div key={symbol} className={S.symbol}>
      {symbol}
      {canUnselect && (
        <button onClick={() => toggle(symbol)}>
          <Image
            src="/images/close.svg"
            width={10}
            height={10}
            alt="close icon"
          />
        </button>
      )}
    </div>
  );
};

export default React.memo(SelectedSymbol);
