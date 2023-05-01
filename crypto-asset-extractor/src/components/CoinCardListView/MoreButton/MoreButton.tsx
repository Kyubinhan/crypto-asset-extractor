import Image from "next/image";
import React from "react";

import styles from "./style.module.scss";

interface Props {
  label: string;
  handleClick: () => void;
  disabled: boolean;
}

const MoreButton: React.FC<Props> = ({ disabled, label, handleClick }) => {
  return (
    <button
      className={styles["more-btn"]}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
      <Image
        src="/images/chevron-arrow-down.svg"
        width={10}
        height={10}
        alt="arrow down icon"
      />
    </button>
  );
};

export default React.memo(MoreButton);
