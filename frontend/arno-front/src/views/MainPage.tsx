import { Center, Text, Anchor } from "@mantine/core";

import { Helmet } from "react-helmet";
const TITLE = "آرنو | صفحه اصلی";

const MainPage = () => {
  return (
    <>
      <Helmet><title>{TITLE}</title></Helmet>

      <Center>
        <Text size="xl">
          برای مشاهده‌ی خدمات آرنو از
          <Anchor size="xl" href="/services">
            {" "}
            این صفحه{" "}
          </Anchor>
          دیدن کنید.
        </Text>
      </Center>
    </>
  );
};

export default MainPage;
