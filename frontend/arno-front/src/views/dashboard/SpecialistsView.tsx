import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "متخصصان";

const SpecialistsView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default SpecialistsView;
