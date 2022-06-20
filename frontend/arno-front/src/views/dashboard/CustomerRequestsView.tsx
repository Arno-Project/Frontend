import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "سفارش‌های من";

const CustomerRequestsView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default CustomerRequestsView;
