import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import rtlPlugin from "stylis-plugin-rtl";

import BasePage from "./views/BasePage";
import DashboardPage from "./views/DashboardPage";
import { Route, Routes } from "react-router-dom";
import { Steps } from "intro.js-react";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { disableSteps } from "./redux/intro";

const rtl = true;

const myCache = createEmotionCache(
  rtl
    ? // rtl cache
      { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
    : // ltr cache
      { key: "mantine" }
);

export default function App() {
  const dispatch = useAppDispatch();
  const stepsEnabled = useAppSelector((state) => state.intro.stepsEnabled);
  const initialStep = useAppSelector((state) => state.intro.initialStep);
  const steps = useAppSelector((state) => state.intro.steps);
  const onExit = ()=>{
    dispatch(disableSteps())
  }
  const options = {
      nextLabel: "بعدی",
      prevLabel: "قبلی",
      doneLabel: "پایان",
  }
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
          <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={onExit}
          options={options}
        />

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
