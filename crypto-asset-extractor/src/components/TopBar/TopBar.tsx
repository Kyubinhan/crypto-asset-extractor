import Image from "next/image";
import React from "react";

import styles from "./style.module.scss";

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <Image
        src="/images/haru-logo.png"
        alt="haru logo"
        width={96}
        height={34}
      />
    </div>
  );
};

export default TopBar;
