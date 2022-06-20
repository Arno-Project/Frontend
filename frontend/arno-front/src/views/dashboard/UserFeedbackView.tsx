import { useState } from "react";

import { Helmet } from "react-helmet";
const TITLE = "انتقادات و پیشنهادات";

const UserFeedbackView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default UserFeedbackView;
