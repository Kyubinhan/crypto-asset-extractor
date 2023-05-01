import clsx from "clsx";
import Image from "next/image";
import React from "react";

import styles from "./style.module.scss";

interface Props {
  coin: Coin;
  isSelected: boolean;
  logoUrl: string | undefined;
  toggle: (symbol: string) => void;
}

const CoinCard: React.FC<Props> = ({ coin, isSelected, logoUrl, toggle }) => {
  return (
    <button
      key={coin.id}
      className={clsx(styles.card, {
        [styles.selected]: isSelected,
      })}
      onClick={() => toggle(coin.symbol)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        // To silence the onChange missing console error
        onChange={() => {}}
      />
      {logoUrl && (
        <Image src={logoUrl} width={32} height={32} alt="coin logo" />
      )}
      <div className={styles.text}>
        <span className={styles.name}>{coin.name}</span>
        <span className={styles.symbol}>{coin.symbol}</span>
      </div>
    </button>
  );
};

export default React.memo(CoinCard);
