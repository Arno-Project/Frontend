import { Title } from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "مشکلات فنی";

const TechnicalIssuesView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
    </>
  );
};

export default TechnicalIssuesView;
