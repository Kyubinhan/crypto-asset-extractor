import dayjs from "dayjs";
import React from "react";

import S from "./style.module.scss";

interface Props {
  status: CMCResponse<any>["status"];
}

const RequestTimestamps: React.FC<Props> = ({ status }) => {
  const requestTime = dayjs(status.timestamp)
    .format("YYYY.MM.DD HH:mm:ss.SSS")
    .slice(0, -1);
  const responseTime = dayjs(status.timestamp)
    .add(status.elapsed, "millisecond")
    .format("YYYY.MM.DD HH:mm:ss.SSS")
    .slice(0, -1);

  return (
    <div className={S.timestamps}>
      <div>
        <span className={S.label}>Request Time</span>
        <span className={S.timestamp}>{requestTime}</span>
      </div>
      <div>
        <span className={S.label}>Response Time</span>
        <span className={S.timestamp}>{responseTime}</span>
      </div>
    </div>
  );
};

export default React.memo(RequestTimestamps);
