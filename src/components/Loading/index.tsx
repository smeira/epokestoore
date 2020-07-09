import React from "react";

import S from "./Loading.module.css";

const Loading = () => (
  <div className={S.LoadingContainer}>
      <div className={S.LoadingBox}>
        <div className={S.LoadingTop}></div>
        <div className={S.LoadingMiddle}></div>
        <div className={S.LoadingBottom}></div>
      </div>
  </div>
);

export default Loading;
