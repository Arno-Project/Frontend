import {
  Center,
  Group,
  BackgroundImage,
  Grid,
  Text,
  Paper,
  Mark,
  Space,
} from "@mantine/core";

import { Helmet } from "react-helmet";
import { Heart, MapPin, Tool } from "tabler-icons-react";
const TITLE = "آرنو | صفحه اصلی";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <Center mb={50}>
        <Text span size={36}>
          {"به سامانه‌ی "}
          <Text span size={40}
            weight={600}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >آرنو</Text>
          {" خوش آمدید!"}
        </Text>
      <Space h={100} />
      </Center>
      <Grid justify="center" align="flex-end">
        <Grid.Col span={3}>
          <Paper shadow="lg" radius="lg" p="lg" style={{ minHeight: "30vh" }}>
            <Center mb="xl"><Tool color="orange"  size={50} /></Center>
            <Text align="justify">انواع تخصص‌ها و خدمات مورد نظر خود را بیابید یا به سامانه اضافه کنید!</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={3}>
          <Paper shadow="lg" radius="lg" p="lg" style={{ minHeight: "35vh" }}>
            <Center mb="xl"><MapPin color="teal" size={50} /></Center>
            <Text align="justify">از هرکجای کشور می‌توانید با عضویت در آرنو از خدمات مختصصین اطراف خود برخوردار شوید.</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={3}>
          <Paper shadow="lg" radius="lg" p="lg" style={{ minHeight: "25vh" }}>
            <Center mb="xl"><Heart color="red"  size={50} /></Center>
            <Text align="justify">متخصصین و مشتریان خود را با معیارهای گوناگون ارزیابی کنید.</Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default MainPage;
