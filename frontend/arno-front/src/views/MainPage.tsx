import { useMantineTheme, Center, Text, Anchor } from "@mantine/core";

const MainPage = () => {
  const theme = useMantineTheme();

  return (
  <Center>
    <Text size="xl">
      برای مشاهده‌ی خدمات آرنو از 
      <Anchor size="xl" href="/services"> این صفحه </Anchor>
      دیدن
      کنید.
    </Text>
  </Center>);
};

export default MainPage;
