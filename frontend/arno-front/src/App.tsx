import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import rtlPlugin from "stylis-plugin-rtl";

import BasePage from "./views/BasePage";
import DashboardPage from "./views/DashboardPage";
import { Route, Routes } from "react-router-dom";

const rtl = true;

const myCache = createEmotionCache(
  rtl
    ? // rtl cache
      { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
    : // ltr cache
      { key: "mantine" }
);

export default function App() {
  return (
    <>
      <MantineProvider
        // withGlobalStyles
        withNormalizeCSS
        theme={{
          dir: rtl ? "rtl" : "ltr",
          fontFamily: "Vazirmatn, Open Sans, sans serif",
        }}
        emotionCache={myCache}
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
    </>
  );
}
