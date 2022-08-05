import { Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";
const TITLE = "جزئیات سفارش";

const RequestDetails = () => {
  const { requestId } = useParams();

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      {requestId}
    </>
  );
};

export default RequestDetails;
