import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  useMantineTheme,
  AppShell,
  Header,
  Navbar,
} from "@mantine/core";

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

import { Helmet } from "react-helmet";
import { Brand } from "../components/dashboard/_brand";
const TITLE = "آرنو | داشبورد";

const DashboardPage = () => {
  const theme = useMantineTheme();
  const location = useLocation();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const inDashboardMainPage = () => {
    return location.pathname === "/dashboard";
  };

  return (
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
            <Route path="/technical_issues" element={<TechnicalIssuesView />} />
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
          </Routes>
        </Container>
      </AppShell>
    </ColorSchemeProvider>
  );
};

export default DashboardPage;
