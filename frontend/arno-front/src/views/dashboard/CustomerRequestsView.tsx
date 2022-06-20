import { Badge, Space, Table, Title } from "@mantine/core";
import { useState } from "react";

import { Helmet } from "react-helmet";
import { Check, X } from "tabler-icons-react";
const TITLE = "سفارش‌های من";

const CustomerRequestsView = () => {
  return (
    <>
      <Helmet>
        <title>{"آرنو | " + TITLE}</title>
      </Helmet>
      <Title order={2}>{TITLE}</Title>
      <Title order={3} my="md">پذیرش/رد متخصص</Title>
      <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>نام متخصص</th>
                <th>نام خدمت</th>
                <th>تخصص(ها)</th>
                <th>تأیید/رد</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>امیرمهدی نامجو</td>
                <td>نصب ویندوز</td>
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
      <Title order={3} my="md">وضعیت سفارش‌ها</Title>
      <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام خدمت</th>
                <th>وضعیت</th>
                <th>تاریخ آخرین تغییر</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>حمل بار</td>
                <td>
                  <Badge color="yellow" variant="filled">
                    در انتظار پذیرش توسط متخصص
                  </Badge>
                </td>
                <td>30 خرداد 1400</td>
              </tr>
            </tbody>
          </Table>
    </>
  );
};

export default CustomerRequestsView;
