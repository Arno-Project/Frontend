import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "مشکلات فنی";

const TechnicalIssuesView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default TechnicalIssuesView;
