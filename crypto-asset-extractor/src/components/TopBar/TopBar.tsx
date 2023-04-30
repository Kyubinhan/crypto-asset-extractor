import React from "react";

import styles from "./style.module.scss";

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <img src="/images/haru-logo.png" alt="haru logo" />
    </div>
  );
};

export default TopBar;
