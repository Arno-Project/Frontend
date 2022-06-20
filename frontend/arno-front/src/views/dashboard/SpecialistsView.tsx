import { useState } from "react";

import { Badge, Center, Pagination, Space, Table, Title } from "@mantine/core";
import { X, Check } from "tabler-icons-react";

import { useAppSelector } from "../../redux/hooks";

import { Helmet } from "react-helmet";
import { UserRole } from "../../models";
const TITLE = "متخصصان";

const SpecialistsView = () => {
  const user = useAppSelector((state) => state.auth.user);

  const PAGE_SIZE = 5;
  const [activePage, setPage] = useState(1);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      {[UserRole.CompanyManager, UserRole.TechnicalManager].includes(
        user!.role
      ) && (
        <>
          <Title order={3} my="md">
            تأیید متخصصین
          </Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام متخصص</th>
                <th>تخصص(ها)</th>
                <th>تأیید/رد</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>امیرمهدی نامجو</td>
                <td>
                  <Badge color="indigo" variant="filled">
                    نرم‌افزار
                  </Badge>
                  <Badge color="cyan" variant="filled">
                    سخت‌افزار
                  </Badge>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Check color="green" size={22} />
                    <Space w="lg" />
                    <X color="red" size={22} />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
      <Title order={3} my="md">
        مشاهده متخصصین برحسب امتیاز
      </Title>
      <Table striped highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام متخصص</th>
            <th>تخصص(ها)</th>
            <th>امتیاز</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>مصطفی</td>
            <td>
              <Badge color="cyan" variant="filled">
                سخت‌افزار
              </Badge>
            </td>
            <td>4.85</td>
          </tr>
          <tr>
            <td>2</td>
            <td>امیرمهدی</td>
            <td>
              <Badge color="indigo" variant="filled">
                نرم‌افزار
              </Badge>
              <Badge color="orange" variant="filled">
                شبکه
              </Badge>
            </td>
            <td>4</td>
          </tr>
          <tr>
            <td>3</td>
            <td>علیرضا</td>
            <td>
              <Badge color="indigo" variant="filled">
                نرم‌افزار
              </Badge>
              <Badge color="pink" variant="filled">
                فرانت‌اند
              </Badge>
            </td>
            <td>2.5</td>
          </tr>
        </tbody>
      </Table>
      <Center mt="sm">
        <Pagination
          mt="sm"
          total={3} // {Math.ceil(data.length / PAGE_SIZE)}
          color="cyan"
          radius="md"
          withEdges
          page={activePage}
          onChange={setPage}
        />
      </Center>
    </>
  );
};

export default SpecialistsView;
