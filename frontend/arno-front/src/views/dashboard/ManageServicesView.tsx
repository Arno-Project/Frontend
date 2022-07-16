import { useEffect, useState } from "react";

import { Badge, Space, Table, Title, UnstyledButton } from "@mantine/core";
import { Check, X } from "tabler-icons-react";

import { RequestStatus } from "../../assets/consts";
import { showNotification } from "@mantine/notifications";

import { Helmet } from "react-helmet";
const TITLE = "مدیریت خدمات";

interface ServiceSummary {
  customer: string;
  service: string;
  status: string;
}

const fake: ServiceSummary[] = [
  { customer: "علیرضا", service: "بار", status: "Done" },
  { customer: "ممد", service: "ویندوز", status: "WaitingForSpecialist" },
  { customer: "امیر", service: "شبکه", status: "WaitingToAssign" },
  { customer: "رضا", service: "اسباب‌کشی", status: "Cancelled" },
  { customer: "مهدی", service: "جوجه‌کشی", status: "Doing" },
];

const ManageServicesView = () => {
  const [rows, setRows] = useState<ServiceSummary[]>([]);

  useEffect(() => {
    // fetch rows from the server
    setRows(fake);
  }, []);

  const abortService = async (id: any) => {
    if (true) {
      showNotification({
        title: "لغو موفقیت‌آمیز",
        message: "خدمت موردنظر با موفقیت لغو شد.",
        color: "teal",
        icon: <Check size={18} />,
      });
    }
    // TODO reload the list
  };
  
  const renderRows = () => {
    const body: any[] = rows.map((obj: ServiceSummary, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{obj.customer}</td>
            <td>{obj.service}</td>
            <td>
              <Badge color={RequestStatus[obj.status].color} variant="filled">
                {RequestStatus[obj.status].message}
              </Badge>
            </td>
            <td>
              {obj.status !== "Cancelled" && <UnstyledButton onClick={() => abortService(i)}>
                <X color="red" size={22} />
              </UnstyledButton>}
            </td>
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
      <Title order={3} my="md">
        لغو خدمات
      </Title>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>نام مشتری</th>
            <th>نام خدمت</th>
            <th>وضعیت</th>
            <th>لغو خدمت</th>
          </tr>
        </thead>
        {renderRows()}
      </Table>
    </>
  );
};

export default ManageServicesView;
