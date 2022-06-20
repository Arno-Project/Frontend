import { Title } from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "متخصصان";

const SpecialistsView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
    </>
  );
};

export default SpecialistsView;
