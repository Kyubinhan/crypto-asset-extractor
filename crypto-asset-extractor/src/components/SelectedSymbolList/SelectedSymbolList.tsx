import Image from "next/image";
import React from "react";

import { SelectedSymbolState } from "src/hooks";

import styles from "./style.module.scss";

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
    <div className={styles.list}>
      {symbols.map((symbol) => (
        <div key={symbol} className={styles.symbol}>
          {symbol}
          {isToggleAble && (
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
      ))}
    </div>
  );
};

export default SelectedSymbolList;
