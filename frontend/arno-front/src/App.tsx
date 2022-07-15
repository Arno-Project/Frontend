import React from "react";

import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import rtlPlugin from "stylis-plugin-rtl";

import BasePage from "./views/BasePage";
import DashboardPage from "./views/DashboardPage";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { User, UserRole } from "./models";
import { useNavigate } from "react-router-dom";
import { getMyAccount } from "./api/accounts";
import { logout, setUserInfo } from "./redux/auth";

import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

interface IProps {
}
interface IState {
  loading: boolean
  rtl: boolean
}

class App extends React.Component<IProps, IState> {
  state: IState = {
    loading: true,
    rtl: true,
  };

  setLoading(loading: boolean) {
    this.setState((state) => ({
      loading: loading
    }));
  }

  setRTL(rtl: boolean) {
    this.setState((state) => ({
      rtl: rtl
    }));
  }

  render() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getAccountInfo = async () => {
      let data = await getMyAccount();

      if (data["success"]) {
        let userData = data["user"];
        let user: User = {
          id: userData["id"],
          username: userData["username"],
          firstName: userData["first_name"],
          lastName: userData["last_name"],
          email: userData["email"],
          role: data["role"] as UserRole,
          phone: userData["phone"],
        };

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
      this.setLoading(false);
    };

    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);

    if (user === null) {
      getAccountInfo();
    }

    let component = <></>;
    if (!this.state.loading) {
      component = (
        <MantineProvider
          // withGlobalStyles
          withNormalizeCSS
          theme={{
            dir: this.state.rtl ? "rtl" : "ltr",
            fontFamily: "Vazirmatn, Open Sans, sans serif",
          }}
          emotionOptions={
            this.state.rtl
              ? // rtl cache
                { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
              : // ltr cache
                { key: "mantine" }
          }
        >
          <NotificationsProvider>
            <div dir={this.state.rtl ? "rtl" : "ltr"}>
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
        <LoadingOverlay visible={this.state.loading} />
        {component}
      </>
    );
  }
}

export default withRouter(App);
