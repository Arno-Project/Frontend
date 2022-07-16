import { useState } from "react";

import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import rtlPlugin from "stylis-plugin-rtl";

import BasePage from "./views/BasePage";
import DashboardPage from "./views/DashboardPage";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { User, UserRole } from "./models";
import { useNavigate } from "react-router-dom";
import { AccountAPI } from "./api/accounts";
import { logout, setUserInfo } from "./redux/auth";

import { useLocation } from "react-router-dom";
import { APIDataToUser } from "./models/utils";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rtl, setRtl] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getAccountInfo = async () => {
    let res = await AccountAPI.getInstance().getMyAccount();
    let data = res.data;

    if (res.success && data !== null) {
      let user = APIDataToUser(res);

      dispatch(setUserInfo(user));

      if (location.pathname === "/register") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } else {
      dispatch(logout());
      if (location.pathname !== "/register")
        setTimeout(() => {
          navigate("/register");
        }, 500);
    }
    setLoading(false);
  };

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  if (user === null) {
    getAccountInfo();
  }

  let component = <></>;
  if (!loading) {
    component = (
      <MantineProvider
        // withGlobalStyles
        withNormalizeCSS
        theme={{
          dir: rtl ? "rtl" : "ltr",
          fontFamily: "Vazirmatn, Open Sans, sans serif",
        }}
        emotionOptions={
          rtl
            ? // rtl cache
              { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
            : // ltr cache
              { key: "mantine" }
        }
      >
        <NotificationsProvider>
          <div dir={rtl ? "rtl" : "ltr"}>
            {/* <Button onClick={() => setRtl((c) => !c)}>تعویض R به L</Button> */}
            {/* <Header /> */}
            <Routes>
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="*" element={<BasePage />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </NotificationsProvider>
      </MantineProvider>
    );
  }

  return (
    <>
      <LoadingOverlay visible={loading} />
      {component}
    </>
  );
}
