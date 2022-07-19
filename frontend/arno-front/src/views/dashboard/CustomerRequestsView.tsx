import { Badge, Space, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { Check, X } from "tabler-icons-react";

import { RequestStatusBadge } from "../../assets/consts";

import { ServiceSummary } from "../../models";

import { CoreAPI } from "../../api/core";
import { APIDataToRequestsSummary } from "../../models/utils";

import { Helmet } from "react-helmet";
const TITLE = "سفارش‌های من";

const CustomerRequestsView = () => {
  const [rows, setRows] = useState<ServiceSummary[]>([]);

  const getData = async () => {
    const res = await CoreAPI.getInstance().getMyRequestsStatus();
    console.log('$$$', res);
    if (res.success) {
      const data = APIDataToRequestsSummary(res);
      setRows(data);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  const renderRows = () => {
    const body: any[] = rows.map((obj: ServiceSummary, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{!!obj.specialist ? obj.specialist : "-"}</td>
            <td>
              <Badge color={RequestStatusBadge[obj.status].color} variant="filled">
                {RequestStatusBadge[obj.status].message}
              </Badge>
            </td>
            <td>{!!obj.description ? obj.description : "-"}</td>
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
                <th>نام متخصص</th>
                <th>وضعیت</th>
                <th>توضیحات</th>
              </tr>
            </thead>
            { renderRows() }
          </Table>
    </>
  );
};

export default CustomerRequestsView;
