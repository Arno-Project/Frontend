import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "معیارهای ارزیابی";

const EvalMetricsView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default EvalMetricsView;
