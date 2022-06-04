import { useState } from "react";
import { MantineProvider, Button } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

export default function App() {
  const [rtl, setRtl] = useState(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ dir: rtl ? "rtl" : "ltr" }}
      emotionOptions={
        rtl
          ? // rtl cache
            { key: "mantine-rtl", stylisPlugins: [rtlPlugin] }
          : // ltr cache
            { key: "mantine" }
      }
    >
      <div dir={rtl ? "rtl" : "ltr"}>
        <Button onClick={() => setRtl((c) => !c)}>rtl/ltr</Button>
      </div>
    </MantineProvider>
  );
}
