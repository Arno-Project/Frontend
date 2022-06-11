import { useState } from "react";

import { MantineProvider } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

import BasePage from "./views/BasePage";
import DashboardPage from "./views/DashboardPage";
import { Route, Routes } from "react-router-dom";


export default function App() {
  const [rtl, setRtl] = useState(true);

  return (
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
      <div dir={rtl ? "rtl" : "ltr"}>
        {/* <Button onClick={() => setRtl((c) => !c)}>تعویض R به L</Button> */}
        {/* <Header /> */}
        <Routes>
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="*" element={<BasePage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </MantineProvider>
  );
}
