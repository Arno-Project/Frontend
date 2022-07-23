import { Route, Routes } from "react-router-dom";

import { Container, useMantineTheme } from "@mantine/core";

import MainPage from "./base/MainPage";
import SignUpPage from "./base/SignUpPage";
import ServicesPage from "./base/ServicesPage";
import Header from "../components/Header";

const BasePage = () => {
  const theme = useMantineTheme();

  return (
    <>
    <Header />
    <Container className="main-container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Container>
    </>
  );
};

export default BasePage;
