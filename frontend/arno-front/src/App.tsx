import { useState } from "react";

import { MantineProvider, Button } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BasePage from "./views/BasePage";


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
        <Header />
        <BasePage />
        {/* <Footer /> */}
      </div>
    </MantineProvider>
  );
}
