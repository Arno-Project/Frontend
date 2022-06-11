import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ColorScheme, ColorSchemeProvider, useMantineTheme } from "@mantine/core";

import { DashboardNav } from "../components/DashboardNav";

import {Helmet} from "react-helmet";
const TITLE = "آرنو | داشبورد";

const sampleUser = {
  name: "John Doe",
  role: "customer"
}

const DashboardPage = ({ user }: any) => {
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
      <DashboardNav user={sampleUser} />
      <Routes>
        <Route />
      </Routes>
    </ColorSchemeProvider>
  );
};

export default DashboardPage;
