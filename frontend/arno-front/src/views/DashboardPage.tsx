import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ColorScheme, ColorSchemeProvider, useMantineTheme } from "@mantine/core";

import { DashboardNav } from "../components/dashboard/DashboardNav";

import {Helmet} from "react-helmet";
const TITLE = "آرنو | داشبورد";

const DashboardPage = () => {
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Helmet><title>{ TITLE }</title></Helmet>
      <DashboardNav />
      <Routes>
        <Route />
      </Routes>
    </ColorSchemeProvider>
  );
};

export default DashboardPage;
