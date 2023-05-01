import React from "react";

import styles from "./style.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>크립토 자산 데이터 추출하기</h1>
      <h2>
        데이터 추출이 필요한 크립토 자산을 선택 후, 데이터 추출이 가능합니다.
      </h2>
    </div>
  );
};

export default React.memo(Header);
