import { useState } from "react";

import { Table, Title, Text, Center, Button } from "@mantine/core";

import {
  ClipboardText,
  Download,
  MessageReport,
  ReportOff,
} from "tabler-icons-react";
import { useAppSelector } from "../../redux/hooks";

import { Helmet } from "react-helmet";
import { UserRole } from "../../models";
const TITLE = "مشکلات فنی";

const TechnicalIssuesView = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2} mb="sm">{TITLE}</Title>
      <Text>برای دریافت گزارش کل مشکلات روی دکمه زیر کلیک کنید:</Text>
      <Center>
        <Button
          variant="gradient"
          gradient={{ from: "cyan", to: "indigo", deg: 105 }}
          leftIcon={<Download size={20} />}
          // onClick={() => fetchResults()}
        >
          دریافت گزارش
        </Button>
      </Center>
      <Table striped highlightOnHover verticalSpacing="md">
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام ارسال‌کننده</th>
            <th>متن مشکل</th>
            {user!.role === UserRole.CompanyManager && <th>مشاهده پاسخ</th>}
            {user!.role === UserRole.TechnicalManager && <th>ارسال پاسخ</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>علیرضا تاجمیرریاحی</td>
            <td>سلام. این متن یک مشکل فنی است.</td>
            {user!.role === UserRole.CompanyManager && (
              <td>
                <ClipboardText size={24} strokeWidth={2} color="indigo" />
              </td>
            )}
            {user!.role === UserRole.TechnicalManager && (
              <td>
                <MessageReport size={24} strokeWidth={2} color="indigo" />
              </td>
            )}
          </tr>
          <tr>
            <td>2</td>
            <td>امیرمهدی نامجو</td>
            <td>سلام. این هم یک مشکل دیگر که هنوز پاسخ دریافت نکرده.</td>
            {user!.role === UserRole.CompanyManager && (
              <td>
                <ReportOff size={24} strokeWidth={2} color="indigo" />
              </td>
            )}
            {user!.role === UserRole.TechnicalManager && (
              <td>
                <MessageReport size={24} strokeWidth={2} color="indigo" />
              </td>
            )}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TechnicalIssuesView;
