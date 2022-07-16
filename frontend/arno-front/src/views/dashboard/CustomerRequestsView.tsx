import { Badge, Space, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { Check, X } from "tabler-icons-react";

import { RequestStatus } from "../../assets/consts";

import { Helmet } from "react-helmet";
const TITLE = "سفارش‌های من";

interface ServiceSummary {
  customer: string;
  service: string;
  status: string;
  lastModified?: string;
}

const fake: ServiceSummary[] = [
  { customer: "علیرضا", service: "بار", status: "Done", lastModified: "11 تیر 1401" },
  { customer: "ممد", service: "ویندوز", status: "WaitingForSpecialist", lastModified: "12 تیر 1401" },
  { customer: "امیر", service: "شبکه", status: "WaitingToAssign", lastModified: "13 تیر 1401" },
  { customer: "رضا", service: "اسباب‌کشی", status: "Cancelled", lastModified: "14 تیر 1401" },
  { customer: "مهدی", service: "جوجه‌کشی", status: "Doing", lastModified: "15 تیر 1401" },
];

const CustomerRequestsView = () => {
  const [rows, setRows] = useState<ServiceSummary[]>([]);

  useEffect(() => {
    // fetch rows from the server
    setRows(fake);
  }, []);
  
  const renderRows = () => {
    const body: any[] = rows.map((obj: ServiceSummary, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{obj.service}</td>
            <td>
              <Badge color={RequestStatus[obj.status].color} variant="filled">
                {RequestStatus[obj.status].message}
              </Badge>
            </td>
            <td>{obj.lastModified}</td>
          </tr>
    ));
    return <tbody>{body}</tbody>
  };

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
            { renderRows() }
          </Table>
    </>
  );
};

export default CustomerRequestsView;
