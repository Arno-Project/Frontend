import { useState } from "react";

import { Helmet } from "react-helmet";
import { useAppSelector } from "../../redux/hooks";
const TITLE = "اطلاعات کاربری";

const EditProfileView = () => {
  const user = useAppSelector((state) => state.auth.user);
  
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <h2>{TITLE}</h2>
    </>
  );
};

export default EditProfileView;
