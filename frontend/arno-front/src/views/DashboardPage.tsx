import { Route, Routes, useLocation } from "react-router-dom";

import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  useMantineTheme,
  AppShell,
  Header,
  LoadingOverlay,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { AccountAPI } from "../api/accounts";
import { logout, setUserInfo, setUserNotificationCount } from "../redux/auth";

import { APIDataToNotifications, APIDataToUser } from "../models/utils";
import { NotificationAPI } from "../api/notifications";

import { DashboardNav } from "../components/dashboard/DashboardNav";
import AvailableServicesView from "./dashboard/AvailableServicesView";
import CreateRequestView from "./dashboard/CreateRequestView";
import CustomerRequestsView from "./dashboard/CustomerRequestsView";
import EditEverythingView from "./dashboard/EditEverythingView";
import EvalMetricsView from "./dashboard/EvalMetricsView";
import ManageServicesView from "./dashboard/ManageServicesView";
import ReportsView from "./dashboard/ReportsView";
import RequestServiceView from "./dashboard/RequestServiceView";
import ServicePoliciesView from "./dashboard/ServicePoliciesView";
import SpecialistServicesView from "./dashboard/SpecialistServicesView";
import SpecialistsView from "./dashboard/SpecialistsView";
import TechnicalIssuesView from "./dashboard/TechnicalIssuesView";
import UserFeedbackView from "./dashboard/UserFeedbackView";
import EditProfileView from "./dashboard/EditProfileView";
import ManageSpecialitiesView from "./dashboard/ManageSpecialitiesView";
import RequestDetails from "./dashboard/RequestDetails";
import ChatsView from "./dashboard/ChatsView";
import SingleChatView from "./dashboard/SingleChatView";
import NotificationsView from "./dashboard/NotificationsView";

import { Brand } from "../components/dashboard/_brand";

import { Helmet } from "react-helmet";
const TITLE = "آرنو | داشبورد";

const DashboardPage = () => {
  const theme = useMantineTheme();

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getNotifData = async () => {
    let res = await NotificationAPI.getInstance().get([]);
    let data = res.data;

    if (res.success && data !== null) {
      let notifs = APIDataToNotifications(res);
      dispatch(setUserNotificationCount(notifs.length));
    }
  };

  const getData = async (token: string | null) => {
    if (token) {
      let res = await AccountAPI.getInstance().getMyAccount();
      let data = res.data;

      if (res.success && data !== null) {
        getNotifData();

        let user = APIDataToUser(res);

        dispatch(setUserInfo(user));

        if (location.pathname === "/register") {
          setTimeout(() => {
            navigate("/dashboard");
          }, 10);
        }
        setLoading(false);
        return;
      }

      console.log(res);
    }

    dispatch(logout());
    if (location.pathname !== "/register") { // TODO retry (probably in axios config)
      setTimeout(() => {
        setLoading(false);
        navigate("/register");
      }, 10);
    } else {
      setLoading(false);
    }
  };

  const token = useAppSelector((state) => state.auth.token);

  const interval = useInterval(() => getData(token), 60000);

  useEffect(() => {
    getData(token);
    interval.start();
    return interval.stop;
  }, []);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const inDashboardMainPage = () => {
    return location.pathname === "/dashboard";
  };
  
  let component = <></>;
  if (!loading && token) {
    component = (
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <AppShell
          padding="md"
          navbar={<DashboardNav />}
          header={
            <Header height={60} p="xs">
              <Brand />
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Container
            className={inDashboardMainPage() ? "" : "dashboard-container"}
          >
            <Routes>
              <Route
                path="/technical_issues"
                element={<TechnicalIssuesView />}
              />
              <Route path="/specialists" element={<SpecialistsView />} />
              <Route
                path="/suggestion_complaint"
                element={<UserFeedbackView />}
              />
              <Route path="/evaluation_metrics" element={<EvalMetricsView />} />
              <Route path="/report" element={<ReportsView />} />
              <Route path="/requests" element={<CustomerRequestsView />} />
              <Route path="/service_policy" element={<ServicePoliciesView />} />
              <Route path="/services" element={<AvailableServicesView />} />
              <Route path="/my_services" element={<SpecialistServicesView />} />
              <Route path="/edit_data" element={<EditEverythingView />} />
              <Route path="/request_service" element={<RequestServiceView />} />
              <Route path="/create_request" element={<CreateRequestView />} />
              <Route path="/manage_services" element={<ManageServicesView />} />
              <Route path="/profile" element={<EditProfileView />} />
              <Route path="/chats/:peerID" element={<SingleChatView />} />
              <Route path="/chats" element={<ChatsView />} />
              <Route path="/notifications" element={<NotificationsView />} />
              <Route path="/manage_specialities" element={<ManageSpecialitiesView />} />
              <Route path="/request_details/:requestId" element={<RequestDetails />} />
            </Routes>
          </Container>
        </AppShell>
      </ColorSchemeProvider>
    );
  }
  return (
    <>
      <LoadingOverlay visible={loading} />
      {component}
    </>
  );
};

export default DashboardPage;
