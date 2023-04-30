import React from "react";

interface Props {
  handleStart: () => void;
  handleReset: () => void;
}

const StopWatch: React.FC<Props> = ({ handleStart, handleReset }) => {
  const onStartClick = () => {
    handleStart();
  };
  const onResetClick = () => {
    handleReset();
  };

  return (
    <div>
      <button onClick={onStartClick}>Start</button>
      <button onClick={onResetClick}>Reset</button>
    </div>
  );
};

export default StopWatch;
