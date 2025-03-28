import clsx from "clsx";
import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";

interface Props {
  handleStart: () => void;
  handleReset: () => void;
}

const StopWatch: React.FC<Props> = ({ handleStart, handleReset }) => {
  const [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined = undefined;

    if (isCounting) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting]);

  const onStartClick = () => {
    setIsCounting(true);
    handleStart();
  };
  const onResetClick = () => {
    setIsCounting(false);
    setTime(0);
    handleReset();
  };

  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className={styles["stop-watch"]}>
      <span className={clsx(styles.timer, { [styles.counting]: isCounting })}>
        {hours}:{minutes}:{seconds}
      </span>
      {isCounting ? (
        <button className={styles["reset-btn"]} onClick={onResetClick}>
          Reset
        </button>
      ) : (
        <button onClick={onStartClick}>Start</button>
      )}
    </div>
  );
};

export default StopWatch;
